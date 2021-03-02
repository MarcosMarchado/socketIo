import httpServer from 'http'
import app from './app'
import { Socket, Server } from 'socket.io'

const server = httpServer.createServer(app)

const Io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
    }
})

import { Chat } from './Chat/chat'

const chatNamespace = Io.of('/chat')

chatNamespace.on("connection", (socket: Socket) => Chat(Io, socket))

server.listen(8080, () => {
    console.log('Rodando')
})