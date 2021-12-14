const jwt = require('jsonwebtoken')

const makeUserToken = (username,idObject)=>{
  const tokenInfo = {
    username:username,
    id:idObject
  }
  const token = jwt.sign(tokenInfo,process.env.SECRET)
  return token
}

module.exports = {makeUserToken}