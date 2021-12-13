const express = require('express')
const { Blog } = require('../models/blog')
const User = require('../models/user')
const {info,errorInfo} = require('../utils/logger')
const blogsRouter = express.Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')

blogsRouter.get('/',async (req,res)=>{
  const blogs = await Blog.find({}).populate('user',{name:1,username:1,id:1})
  res.status(200).json(blogs)
})

blogsRouter.post('/',async (req,res)=>{
  const tokenInfo = res.locals.tokenInfo 
  if(!tokenInfo || !tokenInfo.id) {
    return res.status(401).json({error: 'token missing or invalid'})
  }
  let blogData = {...req.body,user:tokenInfo.id}

  const requiredProps = ['title','author','url','user']
  const inter = _.intersectionWith(requiredProps,Object.keys(blogData),_.isEqual)
  if(inter.length!==requiredProps.length) {
    res.status(400).send(`Must have the fields: ${requiredProps}`)
    return
  }

  if(!('likes' in blogData)) blogData = {...blogData,likes:0}
  if(!('title' in blogData)) {
    res.status(400).end()
    return
  }
  if(!('url' in blogData)) {
    res.status(400).end()
    return
  }
  const user = await User.findById(blogData.user)
  const {userId,...blogData1} = {...blogData,user: user.id}
  const blog = new Blog(blogData1)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await User.findByIdAndUpdate(user.id,{blogs:user.blogs})
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',async (req,res)=>{
  const id = req.params.id
  const result = await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogsRouter.put('/:id',async (req,res)=>{
  const id = req.params.id
  const newBlog = req.body
  const result = await Blog.findByIdAndUpdate(id,newBlog,{new:true,runValidators:true})
  res.status(200).json(result)
})

module.exports = blogsRouter