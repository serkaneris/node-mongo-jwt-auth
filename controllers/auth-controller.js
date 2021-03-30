const User = require('../models/user')
const bcrypt = require('bcryptjs')

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