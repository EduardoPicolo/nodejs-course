const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
      name: 'Eduardo'
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
   res.send({
      location: 'Brasilia',
      temperature: 27,
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

app.listen(3000, () => {
   console.log('Server is running on port 3000.')
})