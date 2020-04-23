const { Router } = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

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

const upload = multer({
   limits: {
      fileSize: 1000000
   },
   fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
         return callback(new Error('Please upload an image'))

      callback(null, true)
   }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
   req.user.avatar = req.file.buffer
   await req.user.save()
   res.send()
}, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
   req.user.avatar = undefined
   await req.user.save()
   res.send()
}, (error, req, res, next) => {
   res.status(500).send({ error: error.message })
})

router.get('/users/:_id/avatar', async (req, res) => {
   try {
      const user = await User.findById(req.params._id)

      if (!user || !user.avatar)
         throw new Errow()

      res.set('Content-Type', 'image/jpg')
      res.send(user.avatar)
   } catch (error) {
      res.status(404).send()
   }
})

module.exports = router