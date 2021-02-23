import httpServer from 'http'
import app from './app'
import { Socket, Server } from 'socket.io'

const server = httpServer.createServer(app)

const Io = new Server(server)

import { Chat } from './Chat/chat'

const chatNamespace = Io.of('/chat')

// const chatConnection = (socket: Socket) => {
//     Chat(Io, socket);
// }

chatNamespace.on("connection", (socket: Socket) => Chat(Io, socket))

server.listen(8080, () => {
    console.log('Rodando')
})