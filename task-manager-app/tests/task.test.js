const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
   userOne,
   userTwo,
   taskOne,
   setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a new task', async () => {
   const response = await request(app).post('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
         description: 'Test task'
      })
      .expect(201)

   const task = await Task.findById(response.body._id)
   expect(task).not.toBeNull()
   expect(task.completed).toBe(false)
})

test('Should get all tasks for user one', async () => {
   const response = await request(app).get('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
   expect(response.body.length).toBe(2)
})

test('Should not delete not owned task', async () => {
   await request(app).delete('/tasks/' + taskOne._id)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(400)

   const task = await Task.findById(taskOne._id)
   expect(task).not.toBeNull()
})