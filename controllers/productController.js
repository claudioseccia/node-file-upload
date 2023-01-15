const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');

//controller to create the products
const createProduct = async(req,res) => {
    //res.send('create product');
    console.log(req.body);
    const product = await Product.create(req.body); 
    res.status(StatusCodes.CREATED).json({ product });
}

//controller to get all the products
const getAllProducts = async(req,res) => {
    //res.send('list all product');
    const products = await Product.find();
    res.status(StatusCodes.OK).json({products});
}

module.exports = {
    createProduct,
    getAllProducts
}