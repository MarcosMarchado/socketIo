import httpServer from 'http'
import app from './app'
import socket from 'socket.io'

const server = httpServer.createServer(app)

import { Chat } from './Chat/chat'

const Io = new socket.Server(server)

const onConnection = (socket: any) => {
    Chat(Io, socket);
}

Io.on("connection", onConnection)

server.listen(8080, () => {
    console.log('Rodando')
})