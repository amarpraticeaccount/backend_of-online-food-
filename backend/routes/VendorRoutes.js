
const express = require('express');
const router = express.Router();
const Vendorcontrollers = require('../controllers/vendorController'); // Adjust path as needed


router.post('/register', Vendorcontrollers.vendorRegister);
router.post('/login', Vendorcontrollers.vendorLogin);
router.get('/all-vendors',Vendorcontrollers.getAllvendors);
router.get('/single-vendor/:apple',Vendorcontrollers.getVendorById);

module.exports = router;
