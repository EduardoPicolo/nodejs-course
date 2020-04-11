console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#data')
const messageTwo = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()

   const location = search.value

   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''

   fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
         if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
         } else {
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
         }
      })
   })
})