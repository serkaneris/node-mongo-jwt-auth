const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res,next)=>{
    try{
        const hashedPass = await bcrypt.hash(req.body.password,12)
        const result = await User.create({
            username:req.body.username,
            password:hashedPass
        })
    
        res.status(201).json({
            message:'User created',
            result:result
        })
    }catch (err){
        next(err)
    }
}

exports.login = async(req,res,next) => {
    try{
        //1. Find User
        const user = await User.findOne({username:req.body.username})
        if(!user){
            const error = new Error('User not found.')
            error.statusCode = 401
            throw error
        }

        //2. Compare password
        const isPassOK = await bcrypt.compare(req.body.password,user.password)
        if(!isPassOK){
            const error = new Error('Wrong password.')
            error.statusCode = 401
            throw error
        }

        //3.Create token
        const token = jwt.sign({
            username:user.username,
            userId:user._id.toString()
        },
        'writeyoursupersecretkey',
        {expiresIn:'1h'})

        res.status(200).json({
            message:'Login success.',
            userId:user._id.toString(),
            token:token
        })
    }catch(err){
        next(err)
    }
}