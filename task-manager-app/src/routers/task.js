const { Router } = require('express')
const Task = require('../models/task')

const router = new Router()

router.post('/tasks', async (req, res) => {
   const task = new Task(req.body)

   try {
      await task.save()
      res.status(201).send(task)  //201: Created
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

router.get('/tasks', async (req, res) => {
   try {
      const tasks = await Task.find({})
      if (!tasks)
         return res.status(204).send()  //204: No Content
      res.send(tasks)

   } catch (error) {
      res.status(500).send(error)  //500: Internal Server Error
   }
})

router.get('/tasks/:_id', async (req, res) => {
   const { _id } = req.params

   try {
      const task = await Task.findById(_id)
      if (!task)
         return res.status(404).send({ Error: 'Task not found' })  //404: Not Found
      res.send(task)
   } catch (error) {
      res.status(500).send()  //500: Internal Server Error
   }
})

router.patch('/tasks/:_id', async (req, res) => {
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
         return res.status(404).send({ Error: 'Task not found' })  //404: Not Found

      res.send(task)
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

router.delete('/tasks/:_id', async (req, res) => {
   const { _id } = req.params

   try {
      const task = await Task.findByIdAndDelete(_id)
      if (!task)
         return res.status(404).send({ Error: 'Task not found' })  //404: Not Found
      res.send(task)
   } catch (error) {
      res.status(500).send()  //500: Internal Server Error
   }
})

module.exports = router