console.log('04 Store API')

require('dotenv').config()
require('express-async-errors')
const express= require('express')
const app= express()
const connectDB = require('./db/connect')

const productsRouter = require('./routes/products')


//include middleware
app.use(express.json())
const notFoundMiddleware= require('./middleware/not-found')
const errorHandler= require('./middleware/error-handler')

//routes
app.get('/' , (req,res)=>{
res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

//router
app.use('/api/v1/products' , productsRouter)

//product routes
app.use(notFoundMiddleware)
app.use(errorHandler)




const port= process.env.PORT || 4000

//start
const start = async ()=>{
try {
    //connectdb
    await connectDB(process.env.MONGO_URI)
    app.listen(port , console.log(`Server is listening at ${port}...`)) 
} catch (error) {
    console.log(error)
}
}
start()