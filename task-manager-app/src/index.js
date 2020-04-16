const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.post('/users', (req, res) => {
   const user = new User(req.body)
   user.save()
      .then(data => {
         res.status(201).send(data)  //201: Created
      })
      .catch(error => {
         res.status(400).send(error) //400: Bad Request
      })
})

app.get('/users', (req, res) => {
   User.find({})
      .then(users => {
         if (!users) return res.status(204).send()  //204: No Content
         res.send(users)
      })
      .catch(error => {
         res.status(500).send(error)  //500: Internal Server Error
      })
})

app.get('/users/:_id', (req, res) => {
   const { _id } = req.params

   User.findById(_id)
      .then(user => {
         if (!user) return res.status(404).send()  //404: Not Found
         res.send(user)
      })
      .catch(error => {
         res.status(500).send()  //500: Internal Server Error
      })
})


app.post('/tasks', (req, res) => {
   const task = new Task(req.body)
   task.save()
      .then(data => res.status(201).send(data))  //201: Created
      .catch(error => res.status(400).send(error))  //400: Bad Request
})

app.get('/tasks', (req, res) => {
   Task.find({})
      .then(tasks => {
         if (!tasks) return res.status(204).send()  //204: No Content
         res.send(tasks)
      })
      .catch(error => {
         res.status(500).send(error)  //500: Internal Server Error
      })
})

app.get('/tasks/:_id', (req, res) => {
   const { _id } = req.params
   Task.findById(_id)
      .then(task => {
         if (!task) return res.status(404).send()  //404: Not Found
         res.send(task)
      })
      .catch(error => {
         res.status(500).send()  //500: Internal Server Error
      })
})


app.listen(port, () => {
   console.log(`Server is up on port ${port}`)
})