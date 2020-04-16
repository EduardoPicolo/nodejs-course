const moongose = require('mongoose')

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

module.exports = Task