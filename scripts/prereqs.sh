#!/bin/bash
DEBIAN_FRONTEND=noninteractive
sudo apt-get -qy install python-pip
sudo pip install virtualenv
virtualenv ../venv
