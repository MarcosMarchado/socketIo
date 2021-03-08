import httpServer from 'http'
import app from './app'
import { Socket, Server } from 'socket.io'
import { authorize, decodeToken, generateToken } from './utils/authService'
const server = httpServer.createServer(app)

const Io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
    }
})

import { Chat } from './Chat/chat'
import { JsonWebTokenError } from 'jsonwebtoken'

const chatNamespace = Io.of('/chat')

chatNamespace.use(async (socket: Socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const payload: any = decodeToken(String(socket.handshake.query.token))
        if (!payload.id) return next(new Error(payload))
        socket.handshake.query.userId = payload.id
        return next()
    } else {
        return next(new Error('Authentication error'));
    }
})

chatNamespace.on("connection", (socket: Socket) => Chat(Io, socket))

server.listen(8080, () => {
    console.log('Rodando')
})