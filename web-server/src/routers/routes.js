const { Router } = require('express')
const { geocode, forecast } = require('../utils/index')

const router = new Router()

router.get('/', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Eduardo',
      data: 'test',
      error: 'a',
   })
})

router.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Eduardo'
   })
})

router.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      helpText: 'This is some helpful text.',
      name: 'Eduardo'
   })
})

router.get('/weather', (req, res) => {
   if (!req.query.address) {
      return res.send({
         error: "No address provided"
      })
   }
   const address = req.query.address

   geocode(address, (error, geoData) => {
      if (error) return res.send({ error })

      forecast(geoData, (error, forecastData) => {
         if (error) return res.send({ error })

         res.send({ forecast: forecastData, location: geoData.location, address })
      })
   })
})

router.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404,',
      error: 'Help article not found'
   })
})

router.get('*', (req, res) => {
   res.render('404', {
      title: 404,
      error: 'Page not found'
   })
})

export default router