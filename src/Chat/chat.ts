import { Socket, Server } from 'socket.io'


export function Chat(io: Server, socket: Socket) {

    const sendMessage = (msg: any) => {
        console.log(socket.id)
        io.emit('chat message', msg);
    }

    const disconnect = () => {
        console.log("Disconnected: " + socket.id);
    }

    socket.on("chat message", sendMessage);
    socket.on("disconnect", disconnect);;

}