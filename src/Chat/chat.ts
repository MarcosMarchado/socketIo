import { Socket, Server } from 'socket.io'
import db from '../database/connection'
// Implementar mensagem privada
let onlineUsers: Array<any> = []

export async function Chat(io: Server, socket: Socket) {

    const userId = socket.handshake.query.userId
    const user = await db('user').select('nickname', 'id').where({ id: userId }).first()

    //Não colocar valores repetidos
    //1º Saber se já existe o valor no Array
    //Verificar o socket.Id pois muda a cada atualização
    if (onlineUsers.findIndex(user => user.userId == userId) === -1) {
        onlineUsers.push({ socketId: socket.id, userId: user.id, nickname: user.nickname })
        console.log(onlineUsers)
    }
    //Vai receber a msg e depois emitir aos ouvintes
    const sendMessage = async (msg: any) => {
        io.of('/chat').emit('chatMessage', msg, socket.id, user.id, user.nickname);
    }

    const disconnect = () => {
        console.log("Disconnected: " + socket.id);
        //Atualizar a lista de pessoas online
        // const userRemoveId = onlineUsers.findIndex(user => user.socketId == socket.id)
        // onlineUsers.splice(userRemoveId, 1)
        // io.of('/chat').emit('onUsers', onlineUsers) //Ao Atualizar a lista será emitido esse evento para todos
    }

    const typingMessage = () => {
        socket.broadcast.emit("typingMessage", socket.id, user.id, user.nickname)
    }

    const noLongerTypingMessage = () => {
        socket.broadcast.emit("noLongerTypingMessage", socket.id, user.id, user.nickname)
    }


    io.of('/chat').emit('onUsers', onlineUsers) //Quando entrar é emitido esse evento para todos
    socket.emit('UserID', userId)
    socket.on("chatMessage", sendMessage);
    socket.on("disconnect", disconnect);
    socket.on("typingMessage", typingMessage)
    socket.on("noLongerTypingMessage", noLongerTypingMessage)

}


    // const hello = () => {
    //     socket.broadcast.emit('hello', socket.id)
    // }

    // socket.send('Hello')
