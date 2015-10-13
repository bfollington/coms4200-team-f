# React-Pusher
Integrates [Pusher](http://pusher.com) with [POX](http://github.com/noxrepo/pox) for real-time publishing of OpenFlow events.

React frontend based on [React Material Webpack Boilerplate](https://github.com/lern/react-material-webpack-boilerplate) - more detailed `README` can be found in the `/app` directory.

## POX
This is a clone of the [POX repo](http://github.com/noxrepo/pox), with additions that can be found in the `/pox/ext/` directory. This directory is where POX looks for custom modules when starting up.

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
$ npm run start-dev
```

# Schema

There are defined python models for all messages sent via Pusher, these are located in `pox-app/ext/schema`. These are exported to `messages.json` in the root folder to be read in the `web-app`. To compile the messages from python to json run `python pox-app/exit/schema/compile.py` in the root.
