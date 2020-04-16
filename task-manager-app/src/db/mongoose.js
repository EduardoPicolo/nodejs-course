const moongose= require('mongoose')

moongose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
   useNewUrlParser: true,
   useCreateIndex: true
})

const User = moongose.model('User', {
   name: {
      type: String
   },
   age: {
      type: Number
   }
})

// const me = new User({name: 'Eduardo', age: 19})
// me.save().then((data) => {console.log(data)}).catch((error) => {console.log(error)})

const Task = moongose.model('Task', {
   description: {
      type: String,
   },
   completed: {
      type: Boolean,
   },
})

const myTask = new Task({description: 'my first task', completed: true})
myTask.save().then(data => console.log(data)).catch(error => console.log(error))