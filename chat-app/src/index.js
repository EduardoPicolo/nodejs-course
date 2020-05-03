const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
   console.log('New WebSocket connection')

   socket.on('join', ({ username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, username, room })

      if (error) return callback(error)

      socket.join(user.room)

      socket.emit('message', generateMessage('System', 'Welcome!'))
      socket.broadcast.to(user.room).emit('message', generateMessage('System', `${user.username} has joined!`))

      callback()
   })

   socket.on('sendMessage', (msg, callback) => {
      const user = getUser(socket.id)

      const filter = new Filter()
      if (filter.isProfane(msg)) return callback('Profanity is not allowed')

      io.to(user.room).emit('message', generateMessage(user.username, msg))
      callback()
   })

   socket.on('sendLocation', (coords, callback) => {
      const user = getUser(socket.id)

      const { latitude, longitude } = coords
      if (!latitude || !longitude) return callback('No coordinates found')

      io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${latitude},${longitude}`))

      callback()
   })

   socket.on('disconnect', () => {
      const user = removeUser(socket.id)

      if (user) io.to(user.room).emit('message', generateMessage('System', `${user.username} has left!`))

   })
})

server.listen(port, () => {
   console.log('Server is up on port ' + port)
})