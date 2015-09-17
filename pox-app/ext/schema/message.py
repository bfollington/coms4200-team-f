# Message Type

import json
import datetime

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

exports = [
    PacketFloodMessage,
    SystemInitMessage,
    NewConnectionMessage,
    LostConnectionMessage,
    FlowAddedMessage,
    FlowRemovedMessage
]
