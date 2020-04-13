// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
   if (error) {
      return console.log('Unable to connect to database!')
   }

   const db = client.db(databaseName)

   // db.collection('users').findOne({ _id: new ObjectID("5e94764c0ead664bd9a265fe") }, (error, user) => {
   //    if (error) return console.log(error)
   //    console.log(user)
   // })

   // db.collection('users').find({ age: 19 }).toArray((error, users) => {
   //    if (error) return console.log(error)
   //    console.log(users)
   // })

   // db.collection('users').find({ age: 19 }).count((error, count) => {
   //    if (error) return console.log(error)
   //    console.log(count)
   // })

   db.collection('tasks').findOne({ _id: new ObjectID("5e9477e3cc136a4cfc9c3ca3") }, (error, task) => {
      if (error) return console.log(error)
      console.log(task)
   })

   db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
      if(error) return console.log(error)
      console.log(tasks)
   })
})