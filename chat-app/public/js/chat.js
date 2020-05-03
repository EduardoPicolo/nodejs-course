const socket = io()

socket.on('message', (msg) => {
   console.log(msg)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
   e.preventDefault()

   const msg = e.target.elements.message.value

   socket.emit('sendMessage', msg, (error) => {
      if (error) return console.log('Message was not delivered.', error)

      console.log('Message delivered!')
   })
})

document.querySelector('#send-location').addEventListener('click', () => {
   if (!navigator.geolocation) return alert('Geolocation is not supported by your browser')

   navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      socket.emit('sendLocation', { latitude, longitude }, (error) => {
         if (error) return console.log('Location was not shared.', error)

         console.log('Location shared!')
      })
   })
})