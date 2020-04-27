const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
   _id: userOneId,
   name: 'Test User',
   email: 'test@mail.com',
   password: 'passwww',
   age: 99,
   tokens: [{
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
   }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
   _id: userTwoId,
   name: 'User 2',
   email: 'user2@mail.com',
   password: 'passwww',
   age: 1,
   tokens: [{
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
   }]
}

const taskOne = {
   _id: new mongoose.Types.ObjectId(),
   description: 'First task',
   completed: false,
   owner: userOneId
}
const taskTwo = {
   _id: new mongoose.Types.ObjectId(),
   description: 'Second task',
   completed: true,
   owner: userOneId
}
const taskThree = {
   _id: new mongoose.Types.ObjectId(),
   description: 'Third task',
   completed: true,
   owner: userTwoId
}

const setupDatabase = async () => {
   await User.deleteMany()
   await Task.deleteMany()
   await User.create([userOne, userTwo])
   await Task.create([taskOne, taskTwo, taskThree])
}

module.exports = {
   userOne,
   userOneId,
   userTwo,
   userTwoId,
   taskOne,
   taskTwo,
   taskThree,
   setupDatabase
}