const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
    // Blog
    // .find({})
    // .then(blogs => {
    //   response.json(blogs)
    // })
  })

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON)

  // blog
  //   .save()
  //   .then(result => {
  //       response.status(201).json(result)
  //   })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})



module.exports = blogsRouter


