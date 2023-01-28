const mongoose = require('mongoose')
const Schema= mongoose.Schema

//creating a schema for models that will have structure of our databses
const blogSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
} , {timestamps: true})

//model method will contain first argument as- singular of our collection name
//second as schema asscociated with it
const Blog = mongoose.model('Blog', blogSchema)

//export Blog model
module.exports = Blog