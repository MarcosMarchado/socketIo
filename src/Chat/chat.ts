import {Socket,Server} from 'socket.io'


export const Chat = (io:Server  , socket: Socket) => {
    socket.on('new message', (msg) => {
        io.emit('new message', msg)
    })
}