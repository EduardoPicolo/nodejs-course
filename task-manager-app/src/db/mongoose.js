const moongose = require('mongoose')

moongose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
})