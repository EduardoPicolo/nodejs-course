const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
   console.log('New WebSocket connection')

   socket.emit('message', generateMessage('Welcome!'))
   socket.broadcast.emit('message', generateMessage('A new user has joined'))

   socket.on('sendMessage', (msg, callback) => {
      const filter = new Filter()

      if (filter.isProfane(msg)) return callback('Profanity is not allowed')

      io.emit('message', generateMessage(msg))
      callback()
   })

   socket.on('sendLocation', (coords, callback) => {
      const { latitude, longitude } = coords

      if (!latitude || !longitude) return callback('No coordinates found')

      io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`))

      callback()
   })

   socket.on('disconnect', () => {
      io.emit('message', generateMessage('A user has left'))
   })
})

server.listen(port, () => {
   console.log('Server is up on port ' + port)
})