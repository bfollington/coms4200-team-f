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
