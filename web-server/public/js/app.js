console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const $searchInput = document.querySelector('input')
const $messageOne = document.querySelector('#location')
const $messageTwo = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()

   const location = $searchInput.value

   $messageOne.textContent = 'Loading...'
   $messageTwo.textContent = ''

   fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
         if (data.error) {
            console.log(data.error)
            $messageOne.textContent = data.error
         } else {
            console.log(data)
            $messageOne.textContent = data.location
            $messageTwo.textContent = data.forecast
         }
      })
   })
})

const $myLocationButton = document.querySelector('#my-location')

$myLocationButton.addEventListener('click', () => {
   if (!navigator.geolocation) return alert('Your browser does not support geolocation!')

   $myLocationButton.setAttribute('disabled', 'disabled')
   $myLocationButton.textContent = 'Fetching data...'
   $searchInput.setAttribute('disabled', 'disabled')

   navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const { data } = await axios.get(`/weather?latitude=${latitude}&longitude=${longitude}`)

      $myLocationButton.removeAttribute('disabled')
      $myLocationButton.textContent = 'My location'
      $searchInput.removeAttribute('disabled')

      if (data.error) {
         console.log(data.error)
         $messageOne.textContent = data.error
      } else {
         console.log(data)
         $messageOne.textContent = data.location
         $messageTwo.textContent = data.forecast
      }
   })
})