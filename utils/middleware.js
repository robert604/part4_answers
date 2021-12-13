const logger = require('./logger')

const errorHandler = (error,req,res,next)=>{
  const errdata = Object.entries(error)
  next(error)
}

module.exports = {
  errorHandler
}