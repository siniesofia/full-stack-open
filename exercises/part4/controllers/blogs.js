const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenMiddleware = (request, response, next) => {

}

const getTokenFrom = request => {
  console.log('request on', request)
  const authorization = request.get('authorization')
  console.log('authorisation on', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
    // Blog
    // .find({})
    // .then(blogs => {
    //   response.json(blogs)
    // })
  })

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
  
    const blog = new Blog({
      title: body.title,
      // important: body.important === undefined ? false : body.important,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes === undefined ? 0 : body.likes
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.json(savedBlog.toJSON())
  } catch(error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).send({ error: 'invalid token' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    console.log('user', user)

    console.log('blog', blog)

    if ( blog.user.toString() === user._id.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'user doesnt match to blog' })
    }

  

  } catch(error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).send({ error: 'invalid token' })
    }
  }
})


// blogsRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.status(204).end()

// })




module.exports = blogsRouter
