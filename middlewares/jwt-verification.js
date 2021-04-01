const jwt = require('jsonwebtoken')
const {secretKey} = require('../config.json')

exports.verifyJWT = (req,res,next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        const err = new Error('Not authenticated.')
        err.statusCode = 401
        throw err
    }
    const token = authHeader.split(' ')[1]
    let decodedToken
    try{
        decodedToken = jwt.verify(token,secretKey)
    }catch (err){
        err.statusCode = 500
        throw err
    }
    if(!decodedToken){
        const err = new Error('Not authenticated.')
        err.statusCode = 401
        throw err
    }
    req.userId = decodedToken.userId
    next()
}