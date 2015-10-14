from pusher import Pusher
from pox.core import core
import logging

from collections import deque
from modules.timer_thread import TimerThread
from threading import Event
from schema.message import *

import sys

log = core.getLogger()
PUSHER_SEND_FREQUENCY = 3

pusher = Pusher(
    app_id='139897',
    key='b0c3071307e884cae9db',
    secret='a8dfd219b67ef6c902c7'
)

urllib3_logger = logging.getLogger('urllib3')
urllib3_logger.setLevel(logging.CRITICAL)

class PusherThread(TimerThread):
    def __init__(self, cb, time, stream):

        TimerThread.__init__(self, Event(), cb, time)
        log.debug("Pusher is up, on stream %s" % stream)
        self.setDaemon(True)
        self.stream = stream


queue = []
pusher_thread = None

def send_message(message, stream):

    global queue
    queue.append( message )
    log.debug("Queue message %s" % message.to_dict())
    if (len(queue) > 8):
        send_message_actual(stream)

def send_message_immediate(message, stream):
    global pusher_thread
    if pusher_thread == None:

        def callback():
            send_next_from_queue(stream)

        pusher_thread = PusherThread(callback, PUSHER_SEND_FREQUENCY, stream)
        pusher_thread.start()

    pusher.trigger(pusher_thread.stream, message.get_type(), message.to_dict())

def send_message_actual(stream):
    global queue
    message = BatchMessage(queue)

    # Clear the queue, Python is weird sometimes
    send_message_immediate(message, stream)
    print queue
    del queue[:]

def send_next_from_queue(stream):

    global queue
    if len(queue) > 0:
        send_message_actual(stream)
    else:
        return

