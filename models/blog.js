const {MONGODB_URI} = require('../utils/config')
const {info,errorInfo} = require('../utils/logger')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:String,
  author:String,
  url:String,
  likes:Number
})

const Blog = mongoose.model('Blog',blogSchema)
/*
mongoose.connect(MONGODB_URI).then(result=>{
  //info("connection completed")
}).catch(error=>{
  errorInfo("connect failed",error.name)
})*/

module.exports = {Blog}