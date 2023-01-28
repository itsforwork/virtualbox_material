const mongoose= require("mongoose")
//mongoose sits on top of mongodb native driver(mongodb) which gives richer developer experience 
const express= require('express')
const path= require('path')
const bodyParser = require("body-parser")

//connecting express
const app= express()
app.use('/' , express.static(path.resolve(__dirname, 'assests')))
app.use(bodyParser.json())

//printing records in terminal 
app.post('/api/create' , async(req,res)=>{
    const record= req.body
    console.log(record)
    res.json({status: 'ok'})
})
//connecting mongoose
mongoose.connect("mongodb://localhost:27017/myfirstdatabase")
     .then((res)=>{console.log("connection successful...")})
    .catch((err)=>{console.log(err)})

app.listen(3000, ()=>{
        console.log('server up')
    })
    
        
     