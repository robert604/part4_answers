const express = require('express')
const { Blog } = require('../models/blog')

const blogsRouter = express.Router()


blogsRouter.get('/',(req,res)=>{
  Blog.find({}).then(blogs=>{
    res.status(200).json(blogs)
  })
})

blogsRouter.post('/',(req,res)=>{
  let blogData = req.body
  if(!('likes' in blogData)) blogData = {...blogData,likes:0}  
  const blog = new Blog(blogData)

  blog.save().then(newblog=>{
    res.status(201).json(blog)
  })
})



module.exports = blogsRouter