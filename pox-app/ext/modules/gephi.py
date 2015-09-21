# Copyright 2013 James McCauley
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at:
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
Detects topology and streams it to Gephi
Gephi is a pretty awesome graph visualization/manipulation package.  It has
a plugin for streaming graphs back and forth between it and something else.
We use that (by opening a listening socket -- port 8282 by default) and
sending detected switches, links, and (optionally) hosts.
Based on POXDesk's tinytopo module.
Requires discovery.  host_tracker is optional.
pox.py openflow.discovery misc.gephi_topo host_tracker forwarding.l2_learning
"""

"""
Based on the original GephiTopo, attribution given above.

UQ 2015
"""

from threading import Thread, Event

from pox.core import core
from pox.lib.util import dpid_to_str
from pox.lib.ioworker.workers import *
from pox.lib.ioworker import *

import lib.push as pusher
from schema.message import *

import json

log = core.getLogger()

# Modelling actions

def add_switch(n):
  return SwitchAddedMessage(id=str(n))

def add_host(n):
  return HostAddedMessage(id=str(n))

def delete_switch(n):
  return SwitchRemovedMessage(id=str(n))

def delete_host(n):
  return HostRemovedMessage(id=str(n))

def reset_graph():
  return ClearMessage()

# A "link" is switch to switch
def add_link(a, b):
  return LinkAddedMessage(str(a), str(b))

def delete_link(a, b):
  return LinkRemovedMessage(str(a), str(b))

# Host to switch is a special case
def add_host_link(h, s):
  return SwitchHostLinkAddedMessage(str(h), str(s))

def delete_host_link(h, s):
  return SwitchHostLinkRemovedMessage(str(h), str(s))


class SyncThread(Thread):
    def __init__(self, event, cb):
        Thread.__init__(self)
        self.stopped = event
        self.callback = cb

    def run(self):
        while not self.stopped.wait(30):
            print "my thread"
            self.callback()

class GephiTopo (object):
  def __init__ (self, host_tracker=False):
    core.listen_to_dependencies(self)
    core.addListeners(self)
    self.switches = set()
    self.links = set()
    self.hosts = {} # mac -> dpid

    if host_tracker:
      log.info("Host tracking enabled")

      host_tracker.addListenerByName("HostEvent",
        self.__handle_host_tracker_HostEvent)

    self.stopSyncThread = Event()
    self.syncThread = SyncThread(self.stopSyncThread, self.sync)
    self.syncThread.start()

  def sync(self):
    self.send_full()

  def send (self, data):
    print "Send", data.to_dict()
    pusher.send_message(data)

  def send_full (self):
    # FIXME: order is not guaranteed for sending, can we batch pusher messages to keep order?
    out = []

    out.append(reset_graph())

    for s in self.switches:
      out.append(add_switch(s))
    for e in self.links:
      out.append(add_link(e[0],e[1]))
    for h,s in self.hosts.iteritems():
      out.append(add_host(h))
      if s in self.switches:
        out.append(add_host_link(h,s))

    for action in out:
      self.send(action)

  def __handle_host_tracker_HostEvent (self, event):
    # Name is intentionally mangled to keep listen_to_dependencies away
    h = str(event.entry.macaddr)
    s = dpid_to_str(event.entry.dpid)

    if event.leave:
      if h in self.hosts:
        if s in self.switches:
          self.send(delete_host_link(h,s))
        self.send(delete_host(h))
        del self.hosts[h]
    else:
      if h not in self.hosts:
        self.hosts[h] = s
        self.send(add_host(h))
        if s in self.switches:
          self.send(add_host_link(h, s))
        else:
          log.warn("Missing switch")

  def _handle_GoingDownEvent(self, event):

    # Stop the sync thread
    self.stopSyncThread.set()

  def _handle_openflow_ConnectionUp (self, event):
    s = dpid_to_str(event.dpid)
    if s not in self.switches:
      self.send(add_switch(s))
      self.switches.add(s)

  def _handle_openflow_ConnectionDown (self, event):
    s = dpid_to_str(event.dpid)
    if s in self.switches:
      self.send(delete_switch(s))
      self.switches.remove(s)

  def _handle_openflow_discovery_LinkEvent (self, event):
    s1 = event.link.dpid1
    s2 = event.link.dpid2
    s1 = dpid_to_str(s1)
    s2 = dpid_to_str(s2)
    if s1 > s2: s1,s2 = s2,s1

    assert s1 in self.switches
    assert s2 in self.switches

    if event.added and (s1,s2) not in self.links:
      self.links.add((s1,s2))
      self.send(add_link(s1,s2))

      # Do we have abandoned hosts?
      for h,s in self.hosts.iteritems():
        if s == s1: self.send(add_host_link(h,s1))
        elif s == s2: self.send(add_host_link(h,s2))

    elif event.removed and (s1,s2) in self.links:
      self.links.remove((s1,s2))
      self.send(delete_link(s1,s2))
