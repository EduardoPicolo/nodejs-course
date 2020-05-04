const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

exports.setupWebsocket = (server) => {
   const io = socketio(server)

   io.on('connection', (socket) => {
      console.log('New WebSocket connection')

      socket.on('join', ({ username, room }, callback) => {
         const { error, user } = addUser({ id: socket.id, username, room })

         if (error) return callback(error)

         socket.join(user.room)

         socket.emit('message', generateMessage('System', 'Welcome!'))
         socket.broadcast.to(user.room).emit('message', generateMessage('System', `${user.username} has joined!`))
         io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
         })

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

         if (user) {
            io.to(user.room).emit('message', generateMessage('System', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
               room: user.room,
               users: getUsersInRoom(user.room)
            })
         }
      })
   })
}