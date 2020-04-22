const moongose = require('mongoose')

const taskSchema = new moongose.Schema({
   description: {
      type: String,
      required: true,
      trim: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   owner: {
      type: moongose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
   }
}, {
   timestamps: true
})

const Task = moongose.model('Task', taskSchema)

module.exports = Task