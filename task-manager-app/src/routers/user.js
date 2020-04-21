const { Router } = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new Router()

router.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })  //201: Created
   } catch (error) {
      res.status(400).send(error) //400: Bad Request
   }
})

router.post('/users/login', async (req, res) => {
   const { email, password } = req.body
   try {
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.send({ user, token })
   } catch (error) {
      res.status(400).send(error.toString())
   }
})

router.post('/users/logout', auth, async (req, res) => {
   try {
      req.user.tokens = req.user.tokens.filter(item => { return item.token !== req.token })
      await req.user.save()

      res.send('Logged out')
   } catch (error) {
      res.status(500).send(error)
   }
})

router.post('/users/logoutAll', auth, async (req, res) => {
   try {
      req.user.tokens = []
      await req.user.save()
      res.send('Logged out all')
   } catch (error) {
      res.status(500).send(error)
   }
})

router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['name', 'email', 'password', 'age']
   const isValidOperation = updates.every(item => allowedUpdates.includes(item))

   if (!isValidOperation) 
      return res.status(400).send({ Error: 'Invalid updates!' })  //400: Bad Request
   
   try {
      updates.forEach(field => req.user[field] = req.body[field]);
      await req.user.save()
      res.send(req.user)
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

router.delete('/users/me', auth, async (req, res) => {
   try {
      await req.user.remove()
      res.send(req.user)
   } catch (error) {
      res.status(500).send
   }
})

module.exports = router