const products= require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    //throw new Error('testing async errors')
    const product = await products.find({featured: true})
    res.status(200).json({product , nhbits: product.length})
   
}
const getAllProducts = async (req,res)=>{
    console.log(req.query)
    const product = await products.find(req.query)
    res.status(200).json({product , nhbits: product.length})
}
module.exports={
    getAllProducts,
    getAllProductsStatic
}