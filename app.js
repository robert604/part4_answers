const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const morgan = require('morgan')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())
app.use(morgan((tokens,req)=>{
  return JSON.stringify(req.body)
}))
app.use(cors())


app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.errorHandler)

module.exports = app