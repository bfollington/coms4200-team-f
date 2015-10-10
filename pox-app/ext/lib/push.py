from pusher import Pusher
from pox.core import core
import logging

from collections import deque
from modules.timer_thread import TimerThread
from threading import Event
from schema.message import *

log = core.getLogger()
STREAM = "pox"
PUSHER_SEND_FREQUENCY = 10

pusher = Pusher(
    app_id='139897',
    key='b0c3071307e884cae9db',
    secret='a8dfd219b67ef6c902c7'
)

urllib3_logger = logging.getLogger('urllib3')
urllib3_logger.setLevel(logging.CRITICAL)

class PusherThread(TimerThread):
    def __init__(self, cb, time):
        TimerThread.__init__(self, Event(), cb, time)
        print "NEW PUSHER THREAD"
        self.setDaemon(True)


queue = []
pusher_thread = None

def send_message(message):
    global pusher_thread
    if pusher_thread == None:
        pusher_thread = PusherThread(send_next_from_queue, PUSHER_SEND_FREQUENCY)
        pusher_thread.start()

    global queue
    queue.append( message )
    log.debug("Queue message %s" % message.to_dict())
    if (len(queue) > 5):
        send_message_actual()

def send_message_immediate(message):
    pusher.trigger(STREAM, message.get_type(), message.to_dict())

def send_message_actual():
    global queue
    message = BatchMessage(queue)

    # Clear the queue, Python is weird sometimes
    send_message_immediate(message)
    print queue
    del queue[:]

def send_next_from_queue():

    global queue
    if len(queue) > 0:
        send_message_actual()
    else:
        return

