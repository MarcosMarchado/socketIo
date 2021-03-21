import { Socket, Server } from 'socket.io'
import db from '../database/connection'
// Implementar mensagem privada
let onlineUsers: Array<any> = []

export async function Chat(io: Server, socket: Socket) {

  const userId = socket.handshake.query.userId
  const user = await db('user').select('nickname', 'id').where({ id: userId }).first()
  const unreadMessage: any[] = []


  //Verificar o socket.Id pois muda a cada atualização
  if (onlineUsers.findIndex(user => user.userId == userId) === -1) {
    onlineUsers.push({ socketId: socket.id, userId: user.id, nickname: user.nickname })
    console.log(onlineUsers)
  }

  const join = () => {
    socket.join(user.id)
  }
  //Vai receber a msg e depois emitir aos ouvintes
  const sendMessage = async (msg: any) => {
    io.of('/chat').emit('chatMessage', msg, socket.id, user.id, user.nickname);
  }

  // !Private Message
  const sendPrivateMessage = async (msg: any, targetUserId: any) => {
    let message = await db('message').insert({ user_target_id: targetUserId, user_sender_id: user.id, message: msg }).returning('*')

    io.of('/chat').in(targetUserId).in(user.id).emit('sendPrivateMessage', message[0])
  }

  const loadMessages = async (loadFromUserId: any) => {
    let messages = await db('message')
      .where({ user_target_id: loadFromUserId, user_sender_id: user.id })
      .orWhere({ user_target_id: user.id, user_sender_id: loadFromUserId })

    socket.emit('onLoadMessage', messages)
  }

  const disconnect = () => {
    console.log("Disconnected: " + socket.id);
    //Atualizar a lista de pessoas online
    const userRemoveId = onlineUsers.findIndex(user => user.socketId == socket.id)
    onlineUsers.splice(userRemoveId, 1)
    io.of('/chat').emit('onUsers', onlineUsers) //Ao Atualizar a lista será emitido esse evento para todos
  }

  const typingMessage = () => {
    socket.broadcast.emit("typingMessage", socket.id, user.id, user.nickname)
  }

  const noLongerTypingMessage = () => {
    socket.broadcast.emit("noLongerTypingMessage", socket.id, user.id, user.nickname)
  }


  // !Private Message
  socket.on('join', join)
  socket.on('sendPrivateMessage', sendPrivateMessage)
  socket.on('loadMessages', loadMessages)
  // socket.emit('unreadMessageNotification', unreadMessage)
  //Quando entrar é emitido esse evento para todos
  io.of('/chat').emit('onUsers', onlineUsers)
  socket.emit('UserID', userId)
  socket.on("chatMessage", sendMessage);
  socket.on("disconnect", disconnect);
  socket.on("typingMessage", typingMessage)
  socket.on("noLongerTypingMessage", noLongerTypingMessage)

}

