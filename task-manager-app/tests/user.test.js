const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
   const response = await request(app).post('/users')
      .send({
         name: 'Eduardo',
         email: 'eduardo@mail.com',
         password: 'passwww'
      })
      .expect(201)

   // Assert that the databse was changed correctly
   const user = await User.findById(response.body.user._id)
   expect(user).not.toBeNull()

   // Assertions about the response 
   expect(response.body).toMatchObject({
      user: {
         name: 'Eduardo',
         email: 'eduardo@mail.com'
      },
      token: user.tokens[0].token
   })
})

test('Should not signup user with invalid email', async () => {
   const response = await request(app).post('/users')
      .send({
         name: 'Eduardo',
         email: 'invalidEmail',
         password: 'passwww!'
      })
      .expect(400)

   expect(response.body.errors.email.message).toEqual('Email is invalid')
})

test('Should login existing user', async () => {
   const response = await request(app).post('/users/login')
      .send({
         email: userOne.email,
         password: userOne.password
      })
      .expect(200)

   const user = await User.findById(response.body.user._id)
   expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non existing user', async () => {
   await request(app).post('/users/login')
      .send({
         email: userOne,
         password: 'wrongPass'
      })
      .expect(400)
})

test('Should get profile for user', async () => {
   await request(app).get('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
   await request(app)
      .get('/users/me')
      .send()
      .expect(401)
})

test('Should delete account for user', async () => {
   const response = await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)

   const user = await User.findById(response.body.user._id)
   expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
   await request(app)
      .delete('/users/me')
      .send()
      .expect(401)
})

test('Should upload avatar image', async () => {
   await request(app).post('/users/me/avatar')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .attach('avatar', 'tests/fixtures/profile-pic.jpg')
      .expect(200)

   const user = await User.findById(userOneId)
   expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
   await request(app).patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
         name: 'updatedName'
      })
      .expect(200)

   const user = await User.findById(userOneId)
   expect(user.name).toBe('updatedName')
})

test('Should not update invalid user fields', async () => {
   await request(app).patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
         invalidField: 'update'
      })
      .expect(400)
})