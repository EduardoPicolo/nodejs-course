const path = require('path')
const express = require('express')

const app = express()
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Eduardo'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'Eduardo'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      helpText: 'This is some helpful text.'
   })
})

app.get('/weather', (req, res) => {
   res.send({
      location: 'Brasilia',
      temperature: 27,
   })
})

app.listen(3000, () => {
   console.log('Server is running on port 3000.')
})