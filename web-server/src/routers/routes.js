const { Router } = require('express')

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

module.exports = router