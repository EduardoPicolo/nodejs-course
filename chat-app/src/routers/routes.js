const { Router } = require('express')
const auth = require('../middleware/auth')

const router = new Router()

router.get('/login', (req, res) => {
   res.render('login')
})

router.get('/register', (req, res) => {
   res.render('register')
})

router.get('/chat', auth, (req, res) => {
   const { username, room } = req.query
   res.redirect(`/chat.html?username=${username}&room=${room}`)
})

module.exports = router