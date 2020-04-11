const request = require('request')

const forecast = ({ latitude, longitude } = {}, done) => {
   const url = `http://api.weatherstack.com/current?access_key=e40f5821de07d2f54416b549b4eccdaa&query=${latitude},${longitude}`

   request({ url, json: true }, (error, response) => {
      if (error) {
         done('Unable to connect to weather service!')
      } else if (response.body.error) {
         done(response.body.error)
      } else {
         const forecast = response.body.current.weather_descriptions[0]
         const temperature = response.body.current.temperature
         const feelsLikeTemp = response.body.current.feelslike
         const data = `${forecast}. It is currently ${temperature} degress out. It feels like ${feelsLikeTemp} degress out.`

         done(null, data)
      }
   })
}

module.exports = forecast