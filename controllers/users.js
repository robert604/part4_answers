const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/',async (req,res)=>{
  const users = await User.find({})
  res.status(200).json(users)
})

usersRouter.post('/',async (req,res)=>{
  const userData = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(userData.password,saltRounds)

  const user = new User({
    username: userData.username,
    name: userData.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter