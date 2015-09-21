from pox.core import core
import pox.openflow.libopenflow_01 as of
from pox.lib.revent import *
from pox.lib.recoco import Timer
from collections import defaultdict
from pox.openflow.discovery import Discovery
from pox.lib.util import dpid_to_str
import time

class topoDiscovery(EventMixin):

    def __init__(self):
        def startup():
            core.openflow.addListeners(self, priority = 0)
            core.openflow_discovery.addListeners(self)
        core.call_when_ready(startup, ('openflow','openflow_discovery'))
        print "init over"

        self.macToPort = {}

    def _handle_PacketIn (self, event):
        """
        Handle packet in messages from the switch to implement above algorithm.
        """

        packet = event.parsed

        def flood (message = None):
          """ Floods the packet """
          msg = of.ofp_packet_out()
          if time.time() - self.connection.connect_time >= _flood_delay:
            # Only flood if we've been connected for a little while...

            if self.hold_down_expired is False:
              # Oh yes it is!
              self.hold_down_expired = True
              log.info("%s: Flood hold-down expired -- flooding",
                  dpid_to_str(event.dpid))

            if message is not None: log.debug(message)
            #log.debug("%i: flood %s -> %s", event.dpid,packet.src,packet.dst)
            # OFPP_FLOOD is optional; on some switches you may need to change
            # this to OFPP_ALL.
            msg.actions.append(of.ofp_action_output(port = of.OFPP_FLOOD))
          else:
            pass
            #log.info("Holding down flood for %s", dpid_to_str(event.dpid))
          msg.data = event.ofp
          msg.in_port = event.port

          pusher.send_message(PacketFloodMessage({'message': 'Packet Flooded'}))
          self.connection.send(msg)

        def drop (duration = None):
          """
          Drops this packet and optionally installs a flow to continue
          dropping similar ones for a while
          """
          if duration is not None:
            if not isinstance(duration, tuple):
              duration = (duration,duration)
            msg = of.ofp_flow_mod()
            msg.match = of.ofp_match.from_packet(packet)
            msg.idle_timeout = duration[0]
            msg.hard_timeout = duration[1]
            msg.buffer_id = event.ofp.buffer_id
            self.connection.send(msg)
          elif event.ofp.buffer_id is not None:
            msg = of.ofp_packet_out()
            msg.buffer_id = event.ofp.buffer_id
            msg.in_port = event.port
            self.connection.send(msg)

        self.macToPort[packet.src] = event.port # 1

        if not self.transparent: # 2
          if packet.type == packet.LLDP_TYPE or packet.dst.isBridgeFiltered():
            drop() # 2a
            return

        if packet.dst.is_multicast:
          flood() # 3a
        else:
          if packet.dst not in self.macToPort: # 4
            flood("Port for %s unknown -- flooding" % (packet.dst,)) # 4a
          else:
            port = self.macToPort[packet.dst]
            if port == event.port: # 5
              # 5a
              log.warning("Same port for packet from %s -> %s on %s.%s.  Drop."
                  % (packet.src, packet.dst, dpid_to_str(event.dpid), port))
              drop(10)
              return
            # 6

            pusher.send_message(FlowAddedMessage({
              "source": {
                "mac": str(packet.src),
                "port": str(event.port)
              },
              "dest": {
                "mac": str(packet.dst),
                "port": str(port)
              }
            }))

            msg = of.ofp_flow_mod()
            msg.match = of.ofp_match.from_packet(packet, event.port)
            msg.idle_timeout = 10
            msg.hard_timeout = 30
            msg.actions.append(of.ofp_action_output(port = port))
            msg.data = event.ofp # 6a
            self.connection.send(msg)

    def _handle_LinkEvent(self, event):
        l = event.link
        sw1 = l.dpid1
        sw2 = l.dpid2
        pt1 = l.port1
        pt2 = l.port2

        print 'link added is %s'%event.added
        print 'link removed is %s' %event.removed
        print 'switch1 %d' %l.dpid1
        print 'port1 %d' %l.port1
        print 'switch2 %d' %l.dpid2
        print 'port2 %d' %l.port2

def launch():
    core.registerNew(topoDiscovery)
