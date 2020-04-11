const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (address) {
   geocode(address, (error, geoData) => {
      if (error) return console.log(error)

      forecast(geoData, (error, forecastData) => {
         if (error) return console.log(error)

         console.log(geoData.location)
         console.log(forecastData)
      })
   })
} else {
   console.log('Provide an address.')
}