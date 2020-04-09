const request = require('request')

const weatherURL = 'http://api.weatherstack.com/current?access_key=e40f5821de07d2f54416b549b4eccdaa&query=37.8267,-122.4233'
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWR1YXJkb3BpY29sbyIsImEiOiJjazhzemhla2swMDhxM25xeDFmNHpsNjNtIn0.mLuQsQKFt4A2-13BnJWSRw&limit=1'

// request({ url: weatherURL, json: true }, (error, response) => {
//    if (error) {
//       console.log('Unnable to connect to weather service!')
//    } else if (response.body.error) {
//       console.log(response.body.error)
//    } else {
//       const temp = response.body.current.temperature
//       const feelsLikeTemp = response.body.current.feelslike
//       console.log('It is currently ' + temp + ' degress out. It feels like ' + feelsLikeTemp + ' degress out.')
//    }
// })

request({ url: geocodeURL, json: true }, (error, response) => {
   if (error) {
      console.log('Unnable to connect to geolocation service!')
   } else if (response.body.features.length === 0) {
      console.log('Invalid location.')
   } else {
      const data = response.body.features[0]
      const [longitude, latitude] = data.center

      console.log(latitude)
      console.log(longitude)
   }

})
