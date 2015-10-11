# Message Type

import json
import datetime

from const import STAT_SAMPLING_PERIOD

class Message(object):

    def __init__(self, data):

        self.time = str(datetime.datetime.now())
        self.data = data

    def get_type(self):
        return self.__class__.__name__

    def to_dict(self):

        return {
            "type": self.get_type(),
            "time": self.time,
            "data": self.data
        }

    def to_json(self):

        return json.dumps(self.to_dict())


class PacketFloodMessage(Message):

    def __init__(self, data):

        super(PacketFloodMessage, self).__init__(data)

class HostEventMessage(Message):

    def __init__(self, data):

        super(HostEventMessage, self).__init__(data)

class SystemInitMessage(Message):

    def __init__(self, data):

        super(SystemInitMessage, self).__init__(data)

class NewConnectionMessage(Message):

    def __init__(self, data):

        super(NewConnectionMessage, self).__init__(data)

class LostConnectionMessage(Message):

    def __init__(self, data):

        super(LostConnectionMessage, self).__init__(data)

class FlowAddedMessage(Message):

    def __init__(self, data):

        super(FlowAddedMessage, self).__init__(data)

class FlowRemovedMessage(Message):

    def __init__(self, data):

        super(FlowRemovedMessage, self).__init__(data)


# Specific Messages

class SwitchAddedMessage(Message):

    def __init__(self, id=""):

        super(SwitchAddedMessage, self).__init__({'id': id})

class SwitchRemovedMessage(Message):

    def __init__(self, id=""):

        super(SwitchRemovedMessage, self).__init__({'id': id})

class HostAddedMessage(Message):

    def __init__(self, id=""):

        super(HostAddedMessage, self).__init__({'id': id})

class HostRemovedMessage(Message):

    def __init__(self, id=""):

        super(HostRemovedMessage, self).__init__({'id': id})

class SwitchHostLinkAddedMessage(Message):

    def __init__(self, host="", switch=""):

        super(SwitchHostLinkAddedMessage, self).__init__({'host': host, 'switch': switch})

class SwitchHostLinkRemovedMessage(Message):

    def __init__(self, host="", switch=""):

        super(SwitchHostLinkRemovedMessage, self).__init__({'host': host, 'switch': switch})

class LinkAddedMessage(Message):

    def __init__(self, start="", start_port=-1, end="", end_port=-1):

        super(LinkAddedMessage, self).__init__({'start': start, "start_port": start_port, 'end': end, "end_port": end_port})

class LinkRemovedMessage(Message):

    def __init__(self, start="", end=""):

        super(LinkRemovedMessage, self).__init__({'start': start, 'end': end})

class PortStatsMessage(Message):

    def __init__(self, rx_packets, tx_packets, rx_bytes, tx_bytes, port_no):

        super(PortStatsMessage, self).__init__({
            "rx_packets": rx_packets,
            "tx_packets": tx_packets,
            "rx_bytes": rx_bytes,
            "tx_bytes": tx_bytes,
            "port_no": port_no
        })

class SwitchStatsMessage(Message):

    def __init__(self, id, port_stats):

        super(SwitchStatsMessage, self).__init__({'id': id, "ports": port_stats})

    def to_dict(self):

        ports = []
        for i in self.data["ports"]:
            ports.append(i.to_dict())

        return {
            "type": self.get_type(),
            "time": self.time,
            "data": {
                "id": self.data["id"],
                "ports": ports,
                "sampling_period": STAT_SAMPLING_PERIOD
            }
        }

class FlowStatsMessage(Message):

    def __init__(self, dpid, bytes, packets, ethernet_source=None, ethernet_dest=None, ip_source=None, ip_dest=None, ip_protocol=None, tcp_source=None, tcp_dest=None):

        super(FlowStatsMessage, self).__init__({
            'dpid': dpid,
            'bytes': bytes,
            'packets': packets,
            'ethernet_source': str(ethernet_source),
            'ethernet_dest': str(ethernet_dest),
            'ip_source': str(ip_source),
            'ip_dest': str(ip_dest),
            'ip_protocol': ip_protocol,
            'tcp_source': tcp_source,
            'tcp_dest': tcp_dest
        })

class AllFlowStatsForSwitchMessage(Message):

    def __init__(self, id, total_bytes, total_packets, total_flows):

        super(AllFlowStatsForSwitchMessage, self).__init__({
            "id": id,
            # "flows": flows,
            "total_bytes": total_bytes,
            "total_flows": total_flows,
            "total_packets": total_packets
        })

    def to_dict(self):

        # flows = []
        # for i in self.data["flows"]:
        #     flows.append(i.to_dict())

        return {
            "type": self.get_type(),
            "time": self.time,
            "data": {
                "id": self.data["id"],
                "total_bytes": self.data["total_bytes"],
                "total_packets": self.data["total_packets"],
                "total_flows": self.data["total_flows"],
                # "flows": flows,
                "sampling_period": STAT_SAMPLING_PERIOD
            }
        }

class ClearMessage(Message):

    def __init__(self):

        super(ClearMessage, self).__init__({})

class BatchMessage(Message):

    def __init__(self, messages):

        super(BatchMessage, self).__init__({"messages": messages})

    def to_dict(self):

        messages = []
        for i in self.data["messages"]:
            messages.append(i.to_dict())

        return {
            "type": self.get_type(),
            "time": self.time,
            "data": {
                "messages": messages
            }
        }

class SyncMessage(Message):

    def __init__(self, messages):

        super(SyncMessage, self).__init__({"messages": messages})

    def to_dict(self):

        messages = []
        for i in self.data["messages"]:
            messages.append(i.to_dict())

        return {
            "type": self.get_type(),
            "time": self.time,
            "data": {
                "messages": messages
            }
        }
