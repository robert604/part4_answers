const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { indexOf } = require('lodash')
const {info,errorInfo} = require('../utils/logger')
const {makeUserToken} = require('../utils/helper')

loginRouter.post('/',async (req,res)=>{
  const body = req.body
  const user = await User.findOne({username:body.username})
  const password = body.password
  if(!user || !password || !await bcrypt.compare(password,user.passwordHash)) {
    return res.status(401).json({error: 'invalid name or password'})
  }

  const token = makeUserToken(user.username,user._id)
  res.status(200).send({token,username:user.username,name:user.name})

})

module.exports = loginRouter