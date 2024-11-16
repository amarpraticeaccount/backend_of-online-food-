const express = require('express');
const router = express.Router();
const productcontrollers = require('../controllers/productController'); // Adjust path as needed
// const verifytoken=require('../middlewares/verifyToken');
// Check if vendorRegister function is correctly referenced
router.post('/add-product/:firmId',productcontrollers.addProduct);
router.get('/add-product/:firmId',productcontrollers.getProductById);
router.delete('/:productID',productcontrollers.deleteproductById);

module.exports = router;