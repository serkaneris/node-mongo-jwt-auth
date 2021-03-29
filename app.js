const express= require('express')
const path = require('path')
const authRoutes = require('./routes/auth-routes')
const mongoose = require('mongoose')

const mongodbConnString = 'your connection string'
const app = express()
app.use(express.json());
app.use('/',express.static(path.join(__dirname ,'static')))



app.use('/api',authRoutes)

app.use((err,req,res,next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({
        message:err.message,
        data:err.data
    })
})

mongoose.connect(
    mongodbConnString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(result =>{
        app.listen(8080)
    })
    .catch(err => console.log(err))

