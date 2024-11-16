const express = require('express');
const router = express.Router();
const firmcontrollers = require('../controllers/firmController'); // Adjust path as needed
const verifytoken=require('../middlewares/verifyToken');

router.post('/add-firm',verifytoken ,firmcontrollers.addfirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'../uploads',imageName));
});
router.delete('/:firmId',firmcontrollers.deletefirmById);
module.exports = router;