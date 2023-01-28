//is we have a dummy data of products in json array format , then we can add that all data in database dynamically 
//just create this file, connect it with the same database that you are using in your project, 
//then first delete all the existing data, and add the whole new jsonProducts file 

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts= require('./products.json')


const start= async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Success!!!!!')
    } catch (error) {
        console.log(error)
    }
}
start()