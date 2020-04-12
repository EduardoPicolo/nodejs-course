const path = require('path')
const express = require('express')
const hbs = require('hbs')

const { geocode, forecast } = require('./utils/index')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Eduardo',
      data: 'test',
      error: 'a',
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Eduardo'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      helpText: 'This is some helpful text.',
      name: 'Eduardo'
   })
})

app.get('/weather', (req, res) => {
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
         
         res.send({ forecast:forecastData, location: geoData.location, address})
      })
   })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404,',
      error: 'Help article not found'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
      title: 404,
      error: 'Page not found'
   })
})

app.listen(port, () => {
   console.log('Server is running on port ' + port)
})