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
       	topo = BasicLinearTopo(n=4)
	global net      	
	net = Mininet(topo, controller=RemoteController)
       	net.start()
	print "Dumping host connections"
	dumpNodeConnections(net.hosts)
	print "Testing network connectivity"
	net.pingAll()
	
	t = Timer(10, addSwitchHostTest)
	t.start()
	
	CLI(net)
	net.stop()

def addSwitchHostTest():
	print "Create and setup a new switch s3"
	s1 = net.get('s1')
	s3 = net.addSwitch('s3')
	slink = net.addLink(s1,s3)
	s1.attach(slink.intf1)
	s3.start(net.controllers)
	
	print "Create and setup two new hosts h5 and h6"
	h5 = net.addHost('h5', ip='10.0.0.5')
	h6 = net.addHost('h6', ip='10.0.0.6')
	h5link = net.addLink(s3,h5)
	h6link = net.addLink(s3,h6)
	h5.configDefault(defaultRoute=h5.defaultIntf())
	h6.configDefault(defaultRoute=h6.defaultIntf())
	s3.attach(h5link.intf1)
	s3.attach(h6link.intf1)

	net.pingAll()
	
	return

if __name__ == '__main__':
     	# Tell mininet to print useful information
       	setLogLevel('info')
       	setupTest()
