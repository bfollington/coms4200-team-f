# COMS4200 Group F - PoxVis network visualisation tool

This is the repository for PoxVis. It contains the required pox modules, the web application and relevant development and testing scripts.

Integrates [Pusher](http://pusher.com) with [POX](http://github.com/noxrepo/pox) for real-time publishing of OpenFlow events.

React frontend based on [React Material Webpack Boilerplate](https://github.com/lern/react-material-webpack-boilerplate), which in turn began as a GitHub fork of [webpack/react-starter](https://github.com/webpack/react-starter).

# Installation

Clone the repo and `cd` into the folder first.


## Mininet

It's recommended to run both mininet and pox in a virtual machine. The mininet VM and instructions can be viewed at http://mininet.org/vm-setup-notes/.

For the project to work, your VM must be configured with internet access (both to install dependencies and access Pusher).

To boot mininet into the various test cases, the `start-mn` shell scripts can be used. These are in the root of the repository.

## POX

(Optional, but recommended) Use Python's `virtualenv` to create an isolated environment for installing our Python dependencies (such as Pusher).

There are two libraries required before we install all the python dependencies:

```
$ sudo apt-get install python-dev
$ sudo apt-get install libffi-dev

```

(In `pox-app`):
```
$ virtualenv venv
```

**Make sure to activate it (I always forget to do this).**
```
$ source /venv/bin/activate
```


After that, we need to make sure we have all the necessary Python packages. These can be found in `/pox/requirements.txt`, and can be installed by running:

```
$ pip install -r requirements.txt
```

Next, in the `/pox` (not `/pox/pox`) directory run:
```
./start-pox.sh [stream name]
```

`stream name` is optional and defaults to `pox`.

### Development

All modules are located in `pox-app/ext`. `modules` contains our pox modules, `lib` contains the Pusher interface and `schema` contains the message models.

For ease of development, the entirety of pox is included in the repository. This is not ideal and should be removed if further development occurs. The _only_ files that belong to this project in the `pox-app` folder are:

- `ext/`
- `requirements.txt`
- `start-pox.sh`

## Web App


### Installation

Node is needed to build and run the web-app,

In the `web-app` folder, on your home machine, run:
```
$ npm install
```

### Development

Then, to start the app:

_In one console_:
```
$ npm run hot-dev-server
```

_In another console_:
```
$ npm run start-dev
```

Open your browser and visit `http://localhost:8080`

### Production

It's not recommended to run the app this way yet, but you can:

```
$ npm run build
$ npm run start
```

Open your browser and visit `http://localhost:8080`

# Message Schema

There are defined python models for all messages sent via Pusher, these are located in `pox-app/ext/schema`. These are "exported" through `messages.json` in the root folder to be read in the `web-app`.
