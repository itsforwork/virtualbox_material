const mongoose = require("mongoose");

const taskSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,

    },
    completed: {
        type: Boolean,
        default: false
    }
})
//will grab this model in controllers
module.exports = mongoose.model('Task' , taskSchema)