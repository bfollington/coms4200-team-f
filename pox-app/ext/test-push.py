from pusher import Pusher

pusher = Pusher(
    app_id='139897',
    key='b0c3071307e884cae9db',
    secret='a8dfd219b67ef6c902c7'
)

pusher.trigger('pox', 'init', {'message': 'init learning swtich'})
