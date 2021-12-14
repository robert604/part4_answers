const logger = require('./logger')
const jwt = require('jsonwebtoken')

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

module.exports = {
  errorHandler,
  tokenInfoExtractor
}