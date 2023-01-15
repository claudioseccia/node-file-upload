const express = require('express');
const router = express.Router();
//import the controllers
const { createProduct, getAllProducts } = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');

//invoke the routes
router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

module.exports = router;