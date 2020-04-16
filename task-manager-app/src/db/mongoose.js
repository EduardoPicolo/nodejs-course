const moongose = require('mongoose')
const validator = require('validator')

moongose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
   useNewUrlParser: true,
   useCreateIndex: true
})

const User = moongose.model('User', {
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
         }
      },
   },
   age: {
      type: Number,
      default: 0,
      validate(value) {
         if (value < 0) {
            console.log('error')
            throw new Error('Age must be a positive number')
         }
      },
   },
})

const me = new User({ name: '    Picolo  ', email: 'picolo@mail.com   ' })
me.save().then((data) => { console.log(data) }).catch((error) => { console.log(error) })

const Task = moongose.model('Task', {
   description: {
      type: String,
   },
   completed: {
      type: Boolean,
   },
})

// const myTask = new Task({description: 'my first task', completed: true})
// myTask.save().then(data => console.log(data)).catch(error => console.log(error))