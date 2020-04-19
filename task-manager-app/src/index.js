const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      res.status(201).send(user)  //201: Created
   } catch (e) {
      res.status(400).send(e) //400: Bad Request
   }
})

app.get('/users', async (req, res) => {
   try {
      const users = await User.find({})
      if (!users)
         return res.status(204).send()  //204: No Content
      res.send(users)
   } catch (e) {
      res.status(500).send(e)  //500: Internal Server Error
   }
})

app.get('/users/:_id', async (req, res) => {
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

app.patch('/users/:_id', async (req, res) => {
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
         return res.status(404).send({ Error: 'User not found'})  //404: Not Found

      res.send(user)
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})


app.post('/tasks', async (req, res) => {
   const task = new Task(req.body)

   try {
      await task.save()
      res.status(201).send(task)  //201: Created
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

app.get('/tasks', async (req, res) => {
   try {
      const tasks = await Task.find({})
      if (!tasks)
         return res.status(204).send()  //204: No Content
      res.send(tasks)

   } catch (error) {
      res.status(500).send(error)  //500: Internal Server Error
   }
})

app.get('/tasks/:_id', async (req, res) => {
   const { _id } = req.params

   try {
      const task = await Task.findById(_id)
      if (!task)
         return res.status(404).send({ Error: 'Task not found'})  //404: Not Found
      res.send(task)
   } catch (error) {
      res.status(500).send()  //500: Internal Server Error
   }
})

app.patch('/tasks/:_id', async (req, res) => {
   const allowedUpdates = ['description', 'completed']
   const updates = Object.keys(req.body)
   const isValidOperation = updates.every((item) => allowedUpdates.includes(item))
   if (!isValidOperation)
      return res.status(400).send({ Error: 'Invalid updates!' })  //400: Bad Request

   const { _id } = req.params
   const updateParams = req.body

   try {
      const task = await Task.findByIdAndUpdate(_id, updateParams, { new: true, runValidators: true })

      if (!task)
         return res.status(404).send({ Error: 'Task not found'})  //404: Not Found

      res.send(task)
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})


app.listen(port, () => {
   console.log(`Server is up on port ${port}`)
})