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

beforeAll(async ()=>{
  await mongoose.connect(MONGODB_URI)
  await Blog.deleteMany({})  
  const p = initialBlogs.map(blog=>{
    const b = new Blog(blog)
    return b.save()
  })
  Promise.all(p)
})

beforeEach(async ()=>{

})

test('blogs returned as json',async ()=>{
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
},10000)

test('blogs count test',async ()=>{
  const response = await api.get('/api/blogs')
  const blogs = JSON.parse(response.text)
  expect(blogs.length).toBe(initialBlogs.length)
},10000)

test('id property is id',async ()=>{
  const response = await api.get('/api/blogs')
  const blogs = JSON.parse(response.text)
  expect(blogs[0].id).toBeDefined()
},10000)

afterAll(()=>{
  mongoose.connection.close()
})