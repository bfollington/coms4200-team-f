# Message Type

import json
import datetime

class Message:

    def __init__(self, type, data):

        self.type = type
        self.time = datetime.datetime.now()
        self.data = data

    def get_type(self):
        return self.type

    def to_dict(self):

        return {
            type: self.type,
            time: self.time,
            data: self.data
        }

    def to_json(self):

        return json.dumps(self.to_dict())


class PacketFloodMessage(Message):

    def __init__(self, data):

        super(PacketFloodMessage, self).__init__("packet_flood", data)

class SystemInitMessage(Message):

    def __init__(self, data):

        super(PacketFloodMessage, self).__init__("init", data)
