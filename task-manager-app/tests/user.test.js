const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
   name: 'Test User',
   email: 'test@mail.com',
   password: 'passwww',
   age: 99
}

beforeEach(async () => {
   await User.deleteMany()
   await new User(userOne).save()
})

test('Should sign up a new user', async () => {
   await request(app).post('/users')
      .send({
         name: 'Eduardo',
         email: 'eduardo@mail.com',
         password: 'passwww'
      })
      .expect(201)
})

test('Should login existing user', async () => {
   await request(app).post('/users/login').send({
      email: userOne.email,
      password: userOne.password
   }).expect(200)
})

test('Should not login non existing user', async () => {
   await request(app).post('/users/login').send({
      email: userOne,
      password: 'wrongPass'
   }).expect(400)
})