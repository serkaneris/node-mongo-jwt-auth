const User = require('../models/user')

exports.register = (req,res,next)=>{
    console.log(req.body)
    User.create({
        username:req.body.username,
        password:req.body.password
    })
    .then(result => {
        res.status(201).json({
            message:'User created',
            result:result
        })
    })
    .catch(err => next(err))
}