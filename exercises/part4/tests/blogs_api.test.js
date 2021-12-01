const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "author1",
    url: "www.jotain.com",
    likes: 1
  },
  {
    title: 'Browser can execute only Javascript',
    author: "author1",
    url: "www.jotain.com"
  
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "Fullstack",
    url: "fullstack.com",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
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

test('identification field is called "id"', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('likes field is zero by default', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[1].likes).toBe(0)
})



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