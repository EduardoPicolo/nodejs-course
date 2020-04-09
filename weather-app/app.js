const request = require('request')
const geocode = require('./utils/geocode')

const weatherURL = 'http://api.weatherstack.com/current?access_key=e40f5821de07d2f54416b549b4eccdaa&query=37.8267,-122.4233'

// request({ url: weatherURL, json: true }, (error, response) => {
//    if (error) {
//       console.log('Unable to connect to weather service!')
//    } else if (response.body.error) {
//       console.log(response.body.error)
//    } else {
//       const temp = response.body.current.temperature
//       const feelsLikeTemp = response.body.current.feelslike
//       console.log('It is currently ' + temp + ' degress out. It feels like ' + feelsLikeTemp + ' degress out.')
//    }
// })

geocode('Philadelphia New York', (error, data) => {
   console.log('Error:', error)
   console.log('Data:', data)
})