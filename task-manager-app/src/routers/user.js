const { Router } = require('express')
const User = require('../models/user')

const router = new Router()

router.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      res.status(201).send(user)  //201: Created
   } catch (e) {
      res.status(400).send(e) //400: Bad Request
   }
})

router.get('/users', async (req, res) => {
   try {
      const users = await User.find({})
      if (!users)
         return res.status(204).send()  //204: No Content
      res.send(users)
   } catch (e) {
      res.status(500).send(e)  //500: Internal Server Error
   }
})

router.get('/users/:_id', async (req, res) => {
   const { _id } = req.params

   try {
      const user = await User.findById(_id)
      if (!user)
         return res.status(404).send({ Error: 'Invalid updates!' })  //404: Not Found
      res.send(user)
   } catch (error) {
      res.status(500).send()  //500: Internal Server Error
   }
})

router.patch('/users/:_id', async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['name', 'email', 'password', 'age']
   const isValidOperation = updates.every(item => allowedUpdates.includes(item))

   if (!isValidOperation) {
      return res.status(400).send({ Error: 'Invalid updates!' })  //400: Bad Request
   }

   const { _id } = req.params
   const updateParams = req.body

   try {
      const user = await User.findByIdAndUpdate(_id, updateParams, { new: true, runValidators: true })

      if (!user)
         return res.status(404).send({ Error: 'User not found' })  //404: Not Found

      res.send(user)
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

router.delete('/users/:_id', async (req, res) => {
   const { _id } = req.params

   try {
      const user = await User.findByIdAndDelete(_id)
      if (!user)
         return res.status(404).send({ Error: 'User not found' })  //404: Not Found
      res.send(user)
   } catch (error) {
      res.status(500).send
   }
})
module.exports = router