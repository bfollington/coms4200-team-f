import message
import json
import os

# Export the file to the root of the repository
messages = open(os.path.dirname(os.path.realpath(__file__)) + "/../../../messages.json", "w")

data = {
    "messages": []
}

for m in message.exports:
    data["messages"].append(m.__name__)

print data

messages.write(json.dumps(data))

messages.close()
