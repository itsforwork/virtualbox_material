//models- how our data should looks like.

const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
    record: {type : string , required: true},
    date: {type: Number, required: true, default: 100},

})
const model= mongoose.model('ToDoModel' , ToDoSchema)
module.exports= model