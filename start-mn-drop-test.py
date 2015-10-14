#!/usr/bin/python
from mininet.node import RemoteController
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.cli import CLI
from mininet.util import dumpNodeConnections
from mininet.log import setLogLevel
from threading import Timer

class BasicLinearTopo(Topo):
	"Two switches connected to n hosts - split between the switches."
	def __init__(self, n=2, **opts):
        	# Initialize topology and default options
        	Topo.__init__(self, **opts)
        	self.switch = self.addSwitch('s1')
        	self.switch2 = self.addSwitch('s2')
		self.addLink(self.switch,self.switch2)

		for h in range(n):
			host = self.addHost('h%s' % (h + 1))
			if ( h % 2 == 0 ):
				self.addLink(host, self.switch)
			else:			
				self.addLink(host, self.switch2)
	
def setupTest():
	"Create and test a simple network"
       	topo = BasicLinearTopo(n=6)
	global net      	
	net = Mininet(topo, controller=RemoteController)
       	net.start()
	print "Dumping host connections"
	dumpNodeConnections(net.hosts)
	print "Testing network connectivity"
	net.pingAll()
	
	t = Timer(10, dropHostTest)
	t.start()
	
	CLI(net)
	net.stop()

def dropHostTest():
	print "Taking host down"
	net.configLinkStatus('h1','s1','down')
	
	return

if __name__ == '__main__':
     	# Tell mininet to print useful information
       	setLogLevel('info')
       	setupTest()
