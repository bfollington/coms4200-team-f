from pusher import Pusher



STREAM = "pox"

pusher = Pusher(
    app_id='139897',
    key='b0c3071307e884cae9db',
    secret='a8dfd219b67ef6c902c7'
)

def send_message(message):

    pusher.trigger(STREAM, message.get_type(), message.to_dict())
