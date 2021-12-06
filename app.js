const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')


const app = express()
app.use(express.json())
app.use(morgan((tokens,req)=>{
  return JSON.stringify(req.body)
}))
app.use(cors())


app.use('/api/blogs',blogsRouter)




module.exports = app