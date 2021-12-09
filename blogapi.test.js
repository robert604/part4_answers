const {MONGODB_URI} = require('./utils/config')
const {info} = require('./utils/logger')
const app = require('./app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)
const {Blog} = require('./models/blog')

const initialBlogs = [
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },  
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },

]

var beforeEachPromise
beforeEach(async ()=>{
  await Blog.deleteMany({})
  const promises = initialBlogs.map(blog=>{
    return new Blog(blog).save()
  })
  beforeEachPromise = Promise.all(promises)
})

test('blogs returned as json',async ()=>{
  await beforeEachPromise
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
},10000)

test('blogs count test',async ()=>{
  await beforeEachPromise
  const response = await api.get('/api/blogs')
  const blogs = JSON.parse(response.text)
  expect(blogs.length).toBe(initialBlogs.length)  
},10000)

test('id property is id',async ()=>{
  await beforeEachPromise  
  const response = await api.get('/api/blogs')
  const blogs = JSON.parse(response.text)
  expect(blogs[0].id).toBeDefined()
},10000)

test('add a blog and verify',async ()=>{
  await beforeEachPromise
  const blogToAdd = {
    title: "new title",
    author: "new author",
    url: "new url",
    likes: 12,
  }  
  let response = await api.post('/api/blogs').send(blogToAdd)
  expect(response.status).toBe(201)
  const {id,...saved} = response.body
  expect(saved).toEqual(blogToAdd)  
  response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length+1)
})

test('no likes defaults to zero likes',async ()=>{
  await beforeEachPromise
  const blogToAdd = {
    title: "new title",
    author: "new author",
    url: "new url",
  } 
  let response = await api.post('/api/blogs').send(blogToAdd)
  expect(response.status).toBe(201)
  const {id,...saved} = response.body
  expect(saved.likes).toBe(0)  
})

test('respond with 400 for missing title or url',async ()=>{
  await beforeEachPromise
  let response = await api.post('/api/blogs').send(
    {
      author: "new author",
      url: "new url",
      likes: 12,    
    }
  )
  expect(response.status).toBe(400)
  response = await api.post('/api/blogs').send(
    {
      title: "new title",
      author: "new author",      
      likes: 12,    
    }
  )
  expect(response.status).toBe(400)    
},10000)

afterAll(()=>{
  mongoose.connection.close()
})