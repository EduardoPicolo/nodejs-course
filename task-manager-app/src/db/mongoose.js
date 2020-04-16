const moongose = require('mongoose')

moongose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
   useNewUrlParser: true,
   useCreateIndex: true
})


const Task = moongose.model('Task', {
   description: {
      type: String,
      required: true,
      trim: true
   },
   completed: {
      type: Boolean,
      default: false
   },
})