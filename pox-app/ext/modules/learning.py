from pox.core import core
import pox.openflow.libopenflow_01 as of
from pox.lib.revent import *
from pox.lib.util import dpid_to_str
from pox.lib.util import str_to_bool
import time

# Topology
from pox.openflow.discovery import Discovery
import pox.misc.gephi_topo

# Our pusher integration
import lib.push as pusher
from schema.message import *


from switch_logic import LearningSwitch
from gephi import GephiTopo

log = core.getLogger()

from const import _flood_delay


class l2_learning (EventMixin):
  """
  Waits for OpenFlow switches to connect and makes them learning switches.
  """
  def __init__ (self, transparent):

    def startup ():
      core.addListeners(self)
      core.openflow.addListeners(self)
      core.openflow_discovery.addListeners(self)

    self.switches = {}

    core.call_when_ready(startup, ('openflow','openflow_discovery'))

    self.transparent = transparent

  def _handle_ConnectionDown(self, event):
    # A switch has gone offline

    log.debug("Connection down %s" % (event.connection,))

    # TODO, cleanup the LearningSwitch object


  def _handle_ConnectionUp (self, event):
    # A switch has come online

    log.debug("Connection up %s" % (event.connection,))

    LearningSwitch(event.connection, self.transparent)


def launch (transparent=False, hold_down=_flood_delay):
  """
  Starts an L2 learning switch.
  """
  try:
    global _flood_delay
    _flood_delay = int(str(hold_down), 10)
    assert _flood_delay >= 0
  except:
    raise RuntimeError("Expected hold-down to be a number")

  def going_down(event):
    print "GOING DOOOOOWN"

  # Pass host_tracker in to enable, uh, host tracking
  core.registerNew(GephiTopo, core.host_tracker)
  core.registerNew(l2_learning, str_to_bool(transparent))
