import json
import os

exports = [
    "PacketFloodMessage",
    "SystemInitMessage",
    "NewConnectionMessage",
    "LostConnectionMessage",
    "FlowAddedMessage",
    "FlowRemovedMessage",
    "HostEventMessage",
    "SwitchAddedMessage",
    "SwitchRemovedMessage",
    "HostAddedMessage",
    "HostRemovedMessage",
    "SwitchHostLinkAddedMessage",
    "SwitchHostLinkRemovedMessage",
    "LinkAddedMessage",
    "LinkRemovedMessage",
    "ClearMessage",
    "BatchMessage",
    "PortStatsMessage",
    "SwitchStatsMessage",
    "FlowStatsMessage",
    "AllFlowStatsForSwitchMessage"
]


# Export the file to the root of the repository
messages = open(os.path.dirname(os.path.realpath(__file__)) + "/../../../messages.json", "w")

data = {
    "messages": []
}

for m in exports:
    data["messages"].append(m)

print data

messages.write(json.dumps(data))

messages.close()
