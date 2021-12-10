const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
//   let blogObject = new Blog(initialBlogs[0])
//   await blogObject.save()
//   blogObject = new Blog(initialBlogs[1])
//   await blogObject.save()
})


test('a valid user can be added ', async () => {
  const newUser = {
    username: 'elli',
    name: "Elli",
    password: "jklö"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  const names = response.body.map(u => u.name)

  expect(response.body).toHaveLength(1)
  expect(names).toContain(
    'Elli'
  )
})

test('a username <3  can not be added ', async () => {
    const newUser = {
      username: 'el',
      name: "Elli",
      password: "jklö"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(403)
  
    const response = await api.get('/api/users')
  
    const names = response.body.map(u => u.name)
  
    expect(response.body).toHaveLength(0)
  })

  test('a password <3 can not be added ', async () => {
    const newUser = {
      username: 'elli',
      name: "Elli",
      password: "jk"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(403)
  
    const response = await api.get('/api/users')
  
    const names = response.body.map(u => u.name)
  
    expect(response.body).toHaveLength(0)
  })

  test('a  user without a password can not be added ', async () => {
    const newUser = {
      username: 'elli',
      name: "Elli"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(403)
  
    const response = await api.get('/api/users')
  
    const names = response.body.map(u => u.name)
  
    expect(response.body).toHaveLength(0)
  })

// test('blog without title is not added', async () => {
//   const newBlog = {
//     author: "Fullstack",
//     url: "fullstack.com",
//     likes: 10
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)

//   const response = await api.get('/api/blogs')

//   expect(response.body).toHaveLength(initialNotes.length)
// })

// test('identification field is called "id"', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body[0].id).toBeDefined()
// })

// test('likes field is zero by default', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body[1].likes).toBe(0)
// })


// test('the first blog is about HTTP methods', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body[0].title).toBe('HTML is easy')
// })

// test('all blogs are returned', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body).toHaveLength(initialBlogs.length)
// })

// test('a specific blog is within the returned blogs', async () => {
//   const response = await api.get('/api/blogs')

//   const titles = response.body.map(r => r.title)

//   expect(titles).toContain(
//     'Browser can execute only Javascript'
//   )
// })

afterAll(() => {
  mongoose.connection.close()
})
