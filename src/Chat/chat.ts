import { Socket, Server, Namespace } from 'socket.io'


export function Chat(io: Server, socket: Socket) {

    //Vai receber a msg e depois emitir aos ouvintes
    const sendMessage = (msg: any) => {
        console.log(socket.id)
        io.of('/chat').emit('chatMessage', msg);
    }

    const hello = () => {
        socket.broadcast.emit('hello', socket.id)
    }

    const disconnect = () => {
        console.log("Disconnected: " + socket.id);
    }

    socket.on("chatMessage", sendMessage);
    socket.on("disconnect", disconnect);;
    socket.on("hello", hello);;

}