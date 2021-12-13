const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const _ = require('lodash')

usersRouter.get('/',async (req,res)=>{
  const users = await User.find({})
  res.status(200).json(users)
})

usersRouter.post('/',async (req,res,next)=>{
  const requiredProps = ['name','username','password','blogs']
  const inter = _.intersectionWith(requiredProps,Object.keys(req.body),_.isEqual)
  if(inter.length!==requiredProps.length) {
    res.status(400).send(`Must have the fields: ${requiredProps}`)
    return
  }
  const {name,username,password} = req.body
  if(typeof password!=='string' || typeof username!=='string'
  || password.length<3 || username.length<3) {
    res.status(400).send('Username and password must be at least 3 characters long')
    return
  }
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
      username: username,
      name: name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(200).json(savedUser)
  } catch(error) {
    const errorString = error.toString()
    if(errorString.includes('expected `username` to be unique')) {
      res.status(400).send('Username must be unique')
      return
    }
    next(error)
  }
})

module.exports = usersRouter