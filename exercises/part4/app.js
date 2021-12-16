const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const middleware = require('./middleware/auth')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


// if (process.env.NODE_ENV === 'test') {
const testingRouter = require('./controllers/testing')
app.use('/api/testing', testingRouter)
// }


module.exports = app



// tehty:

// 4.8, 4.9, 4.10, 4.11, 4.13

// ei tehty: 

// 4.12, 4.14


// tehtävät 4.20, 4.22 ja 4.23 tekemättä (4.20 tekeillä mutta ei toimi)

// 4.21 tehty