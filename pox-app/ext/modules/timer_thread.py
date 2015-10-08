from threading import Thread, Event

class TimerThread(Thread):
    def __init__(self, event, cb, time):
        Thread.__init__(self)
        self.stopped = event
        self.callback = cb
        self.time = time

    def run(self):
        while not self.stopped.wait(self.time):
            self.callback()
