const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const hbs = require('hbs')
const userRouter = require('./routers/user')
const routes = require('./routers/routes')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(userRouter)
app.use(routes)

module.exports = app