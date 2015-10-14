from pox.core import core
from pox.lib.util import dpidToStr

import pox.openflow.of_json as of_json
from threading import Event
from timer_thread import TimerThread

import pox.openflow.libopenflow_01 as of

import sys
import datetime

from const import STAT_SAMPLING_PERIOD
import lib.push as pusher

from schema.message import *

import log_style

log = core.getLogger()

def launch (pusher_stream="pox"):
    log_style.config()
    core.registerNew(NetworkStats, pusher_stream)

def get_connection_list():
    return core.openflow._connections.values()

def request_stats():
    # Request both port and flow stats for each connection
    # Event handler will receive the results
    for conn in get_connection_list():
        conn.send( of.ofp_stats_request(body=of.ofp_port_stats_request()) )
        # conn.send( of.ofp_stats_request(body=of.ofp_flow_stats_request()) )

    log.debug("{0} connections to check".format(len(get_connection_list())))

def send(data, stream):
    pusher.send_message_immediate(data, stream)

class NetworkStats(object):

    def __init__ (self, pusher_stream="pox"):
        core.addListeners(self)
        core.openflow.addListeners(self)
        self.stream = pusher_stream

        self.stopStatsThread = Event()
        self.syncThread = TimerThread(self.stopStatsThread, request_stats, STAT_SAMPLING_PERIOD)
        self.syncThread.start()

    def _handle_GoingDownEvent(self, event):
        # Stop the sync thread
        self.stopStatsThread.set()

    def _handle_FlowStatsReceived (self, event) :

        flows = []

        total_bytes = 0
        total_flows = 0
        total_packets = 0
        dpid = dpidToStr(event.connection.dpid)

        for stats in event.stats:

            flows.append(FlowStatsMessage(
                dpid,
                stats.byte_count,
                stats.packet_count,
                ethernet_source=stats.match.dl_src,
                ethernet_dest=stats.match.dl_dst,
                ip_source=stats.match.nw_src,
                ip_dest=stats.match.nw_dst,
                ip_protocol=stats.match.nw_proto,
                tcp_source=stats.match.tp_src,
                tcp_dest=stats.match.tp_dst
            ))

            total_bytes += stats.byte_count
            total_packets += stats.packet_count
            total_flows += 1

        message = AllFlowStatsForSwitchMessage(dpid, total_bytes, total_packets, total_flows)
        send(message, self.stream)


    def _handle_PortStatsReceived (self, event) :
        stats = of_json.flow_stats_to_list(event.stats)

        ports = []

        for port in stats:

            ports.append(PortStatsMessage(
                rx_packets=port["rx_packets"],
                tx_packets=port["tx_packets"],
                rx_bytes=port["rx_bytes"],
                tx_bytes=port["tx_bytes"],
                port_no=port["port_no"]
            ))

        message = SwitchStatsMessage(dpidToStr(event.connection.dpid), ports)
        send(message, self.stream)
