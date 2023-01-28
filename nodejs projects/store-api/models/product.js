const mongoose = require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'product name must be provided']
    },
    price:{
        type: Number,
        required: [true, 'product price must be provided']
    },
    rating:{
        type: Number,
        default: 4.5
    },
    featured: {
        type: Number,
        default: 0,
      },
    createdAt:{
        type: Number,
        default: Date.now()
    },
    //selected names only
    company:{
        type: String,
        enum:{
            values: ['ikea' , 'liddy' , 'caressa' , 'marcos'],
        message: '{Value} is not supported.'
        }
       // enum:['ikea' , 'liddy' , 'caressa' , 'marcos']
    }
})

module.exports= mongoose.model('Product' , productSchema)
