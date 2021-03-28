const express= require('express')
const path = require('path')

const app = express()
app.use(express.json());
app.use('/',express.static(path.join(__dirname ,'static')))

app.post('/api/register', async (req,res,next)=>{
    console.log(req.body.username)
})

app.listen(8080, ()=>{
    console.log('Server Ready! port:8080')
})