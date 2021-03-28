const express= require('express')
const path = require('path')

const app = express()
app.use('/',express.static(path.join(__dirname ,'static')))

app.listen(8080, ()=>{
    console.log('Server Ready! port:8080')
})