const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT

const io = socketio(server)

io.on('connection', () => {
   console.log('New WebSocket connection')
})

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

server.listen(port, () => {
   console.log('Server is up on port ' + port)
})