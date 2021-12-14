const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error,req,res,next)=>{
  const errdata = Object.entries(error)
  next(error)
}

const tokenInfoExtractor = (req,res,next)=>{
  const authorization = req.get('authorization')
  try {
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token =  authorization.substring(7)
      const tokenInfo = jwt.verify(token,process.env.SECRET)
      res.locals.tokenInfo = tokenInfo
    } else {
      res.locals.tokenInfo = null
    }
  } catch(error) {
    res.locals.tokenInfo = null
  }
  next()
}

const userExtractor = async (req,res,next)=>{
  let user = null
  try {
    const authorization = req.get('authorization')   
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token =  authorization.substring(7)
      const tokenInfo = jwt.verify(token,process.env.SECRET)
      if(tokenInfo.id) {
        user = await User.findById(tokenInfo.id)
      }
    }
  } catch(error) {
    logger.errorInfo('user extractor error',error)
  }
  req.user = user
  next()
}

module.exports = {
  errorHandler,
  tokenInfoExtractor,
  userExtractor
}