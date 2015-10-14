#!/bin/bash
stream=${1-pox}

python pox.py log.level --DEBUG host_tracker openflow.discovery --link_timeout=30 openflow.topology forwarding.l2_learning modules.network_topology --pusher_stream=$stream modules.network_stats --pusher_stream=$stream
