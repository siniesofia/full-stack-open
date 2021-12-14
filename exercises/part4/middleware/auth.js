const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')
    console.log('authorisation', authorization)
    console.log('startswith', authorization.toLowerCase().startsWith('bearer '))
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        console.log('tulee tänne')
        console.log('authorization.substring(7)', authorization.substring(7))
        request.token = authorization.substring(7)
      }
    next()

}

module.exports = {
    tokenExtractor
  }