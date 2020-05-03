const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
   console.log(message)
   const html = Mustache.render(messageTemplate, {
      message: message
   })
   $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
   e.preventDefault()

   $messageFormButton.setAttribute('disabled', 'disabled')

   const msg = e.target.elements.message.value

   socket.emit('sendMessage', msg, (error) => {
      $messageFormButton.removeAttribute('disabled')
      $messageFormInput.value = ''
      $messageFormInput.focus()

      if (error) return console.log('Message was not delivered.', error)

      console.log('Message delivered!')
   })
})

$sendLocationButton.addEventListener('click', () => {
   if (!navigator.geolocation) return alert('Geolocation is not supported by your browser')

   $sendLocationButton.setAttribute('disabled', 'disabled')
   $sendLocationButton.textContent = 'Sharing location...'

   navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      socket.emit('sendLocation', { latitude, longitude }, (error) => {
         $sendLocationButton.removeAttribute('disabled')
         $sendLocationButton.textContent = 'Share location'

         if (error) return console.log('Location was not shared.', error)

         console.log('Location shared!')
      })
   })
})