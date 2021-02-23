import { Socket, Server } from 'socket.io'


export function Chat(io: Server, socket: Socket) {

    //Vai receber a msg e depois emitir aos ouvintes
    const sendMessage = (msg: any) => {
        console.log(socket.id)
        io.emit('chat message', msg);
    }

    const hello = () => {
        socket.broadcast.emit('hello', socket.id)
    }

    const disconnect = () => {
        console.log("Disconnected: " + socket.id);
    }

    socket.on("chat message", sendMessage);
    socket.on("disconnect", disconnect);;
    socket.on("hello", hello);;

}