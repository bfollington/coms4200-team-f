# Message Type

import json
import datetime

class Message(object):

    def __init__(self, data):

        self.time = str(datetime.datetime.now())
        self.data = data

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

    def __init__(self, start="", end=""):

        super(LinkAddedMessage, self).__init__({'start': start, 'end': end})

class LinkRemovedMessage(Message):

    def __init__(self, start="", end=""):

        super(LinkRemovedMessage, self).__init__({'start': start, 'end': end})

class ClearMessage(Message):

    def __init__(self):

        super(LinkRemovedMessage, self).__init__({})






exports = [
    PacketFloodMessage,
    SystemInitMessage,
    NewConnectionMessage,
    LostConnectionMessage,
    FlowAddedMessage,
    FlowRemovedMessage,
    HostEventMessage,
    SwitchAddedMessage,
    SwitchRemovedMessage,
    HostAddedMessage,
    HostRemovedMessage,
    SwitchHostLinkAddedMessage,
    SwitchHostLinkRemovedMessage,
    LinkAddedMessage,
    LinkRemovedMessage,
    ClearMessage
]
