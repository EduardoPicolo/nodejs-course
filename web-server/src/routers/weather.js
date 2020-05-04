const { Router } = require('express')
const { geocode, forecast } = require('../utils/index')

const router = new Router()

// /weather?address=***
// /weather?latitude=***&longitude=***
router.get('/weather', (req, res) => {
   const location = req.query

   if (!location.hasOwnProperty('address') && !location.hasOwnProperty('latitude') && !location.hasOwnProperty('longitude')) {
      return res.send({
         error: "No address provided"
      })
   }

   geocode((error, geoData) => {
      if (error) return res.send({ error })

      forecast(geoData, (error, forecastData) => {
         if (error) return res.send({ error })

         res.send({ forecast: forecastData, location: geoData.address, /*address*/ })
      })
   }, location)
})

module.exports = router