def config():
    import pox.log.color
    pox.log.color.launch()
    import pox.log
    pox.log.launch(format="[@@@bold@@@level%(name)-23s@@@reset] " +
        "@@@bold%(message)s@@@normal")
    import pox.log.level
    pox.log.level.launch()
