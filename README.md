# React-Pusher
Integrates [Pusher](http://pusher.com) with [POX](http://github.com/noxrepo/pox) for real-time publishing of OpenFlow events.

React frontend based on [React Material Webpack Boilerplate](https://github.com/lern/react-material-webpack-boilerplate) - more detailed `README` can be found in the `/app` directory.

## POX
This is a clone of the [POX repo](http://github.com/noxrepo/pox), with additions that can be found in the `/pox/etx/` directory. This directory is where POX looks for custom modules when starting up.

To start POX, first make sure you have Mininet configured and run:
```
mininet@mininet-vm$ sudo mn --topo single,3 --mac --controller remote --switch ovsk
```

Optional, but recommended. Use Python's `virtualenv` to create an isolated environment for installing our Python dependencies (such as Pusher).

(In `/pox`):
```

mininet@mininet-vm$ virtualenv venv
```

**Make sure to activate it (I always forget to do this).**
```
mininet@mininet-vm$ source /venv/bin/activate
```


After that, we need to make sure we have all the necessary Python packages. These can be found in `/pox/requirements.txt`, and can be installed by running:

```
mininet@mininet-vm$ pip install -r requirements.txt
```

Next, in the `/pox` (not `/pox/pox`) directory run:
```
mininet@mininet-vm$ python pox.py bootstrap
```

This runs the bootstrap module in `/ext` which launches all the necessary POX components and Pusher.

`/pox/etx/bootstrap.py`:

```
def launch ():
    # Launch logging module
    import pox.log.color
    pox.log.color.launch()
    import pox.log
    pox.log.launch(format="[@@@bold@@@level%(name)-23s@@@reset] " +
        "@@@bold%(message)s@@@normal")
    import pox.log.level
    pox.log.level.launch()

    # Launch topology module
    import pox.topology
    pox.topology.launch()
    import pox.openflow.discovery
    pox.openflow.discovery.launch()
    import pox.openflow.topology
    pox.openflow.topology.launch()
    import pox.host_tracker
    pox.host_tracker.launch()

    # Launch pusher
    from pusher import Pusher
    pusher = Pusher(
        app_id = '139897',
        key = 'b0c3071307e884cae9db',
        secret = 'a8dfd219b67ef6c902c7'
    )

    # Launch module
    from modules import learning
    learning.launch()  
```


Pusher will send the `packet_flood` message from POX to Pusher.

# React
This (very basic) web app simply subscribes for POX events and renders them.

In the `/app` folder, on your home machine, run ():
```
$ npm install
```

Then, to start the app:

_In one console_:
```
$ npm run hot-dev-server
```

_In another console_:
```
$ npm run start-dev```


# Together
Load up `http//localhost:8080` and you will see "No messages available".

If you go back to Mininet and type:
```
mininet> h1 ping h2  
```

You will see the field update to say `pack_flood`.

**Note: A Mininet topology must be running, as well as POX alongside it in the VM.**
