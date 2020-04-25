const request = require('supertest')
const app = require('../src/app')

test('Should sign up a new user', async () => {
   await request(app).post('/users')
      .send({
         name: 'Eduardo',
         email: 'eduardo@mail.com',
         password: 'passwww'
      })
      .expect(201)
})