const express = require('express');
const app=express();

const mongoose= require('mongoose');
const port=4000;



const vendorRoutes = require('./routes/VendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');

const bodyparser=require('body-parser');
const cors=require('cors');
const path=require('path');

app.use(cors());

mongoose.connect("mongodb://localhost:27017/sample")
.then(()=>{
    console.log("Mongodb connected successfully");
})
.catch((error)=>{
    console.log("error");
})
app.use(bodyparser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('uploads',express.static('uploads'));



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

app.get('/',(req,res)=>{
    res.send('hello world');
})








