import httpServer  from 'http'
import app from './app'
import Socket from 'socket.io'

const server =  httpServer.createServer(app)

import Chat from './Chat/chat'

const Io = new Socket.Server(server)

server.listen(8080, ()=>{
    console.log('Rodando')
})
