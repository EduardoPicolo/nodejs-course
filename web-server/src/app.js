const express = require('express')
const path = require('path')
const hbs = require('hbs')
const routes = require('./routers/routes')
const weatherRoutes = require('./routers/weather')

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

app.use(weatherRoutes)
app.use(routes)

module.exports = app