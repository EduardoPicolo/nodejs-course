const { Router } = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new Router()

router.post('/tasks', auth, async (req, res) => {
   const task = new Task({
      ...req.body,
      owner: req.user._id
   })

   try {
      await task.save()
      res.status(201).send(task)  //201: Created
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

router.get('/tasks/:_id', auth, async (req, res) => {
   const { _id } = req.params

   try {
      const task = await Task.findOne({ _id, owner: req.user._id })
      if (!task)
         return res.status(404).send()  //404: Not Found
      res.send(task)
   } catch (error) {
      res.status(500).send()  //500: Internal Server Error
   }
})

// GET /tasks?completed=
// GET /tasks?limit=10&skip=0
router.get('/tasks', auth, async (req, res) => {
   const match = {}

   if (req.query.completed) {
      match.completed = req.query.completed === 'true'
   }

   try {
      await req.user.populate({
         path: 'tasks',
         match,
         options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip)
         }
      }).execPopulate()
      res.send(req.user.tasks)
   } catch (error) {
      res.status(500).send(error)  //500: Internal Server Error
   }
})

router.patch('/tasks/:_id', auth, async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['description', 'completed']
   const isValidOperation = updates.every(item => allowedUpdates.includes(item))
   if (!isValidOperation)
      return res.status(400).send({ Error: 'Invalid updates!' })  //400: Bad Request

   try {
      const task = await Task.findOne({ _id: req.params._id, owner: req.user._id })
      if (!task)
         return res.status(404).send()  //404: Not Found

      updates.map(field => task[field] = req.body[field])
      await task.save()

      res.send(task)
   } catch (error) {
      res.status(400).send(error)  //400: Bad Request
   }
})

router.delete('/tasks/:_id', auth, async (req, res) => {
   const { _id } = req.params

   try {
      const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
      if (!task)
         return res.status(404).send()  //404: Not Found
      res.send(task)
   } catch (error) {
      res.status(500).send()  //500: Internal Server Error
   }
})

module.exports = router