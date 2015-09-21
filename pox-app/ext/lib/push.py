from pusher import Pusher
from pox.core import core
import logging

log = core.getLogger()

urllib3_logger = logging.getLogger('urllib3')
urllib3_logger.setLevel(logging.CRITICAL)

STREAM = "pox"

pusher = Pusher(
    app_id='139897',
    key='b0c3071307e884cae9db',
    secret='a8dfd219b67ef6c902c7'
)

def send_message(message):

    log.debug("Sending message %s" % message.to_dict())
    pusher.trigger(STREAM, message.get_type(), message.to_dict())
