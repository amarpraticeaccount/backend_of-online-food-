const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const dotEnv=require('dotenv');
dotEnv.config();

const secretkey = process.env.whatisyourname ;


 const vendorRegister = async(req,res)=>{
    const { username,email,password } = req.body;
    try{
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already exists");
        }
        const hashedPassword = await bycrypt.hash(password, 10);

        const newVendor=await Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message:' Vendor registred successfully'});
        console.log('registered')
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : "Internal server error"});
       

        
    }
 }


 const vendorLogin= async(req,res)=>{
    const {email,password}= req.body;
    try{
        const vendor=await Vendor.findOne({email});
        if(!vendor || ! (await bycrypt.compare(password,vendor.password))){
            return res.status(401).json("Invalid email or password");
        }
    
       const token=jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:'1h'});
       res.status(200).json({success : "successful login",token});
       console.log(email,'this is token',token);
   }
   catch(error){
    console.log(error);
    res.status(500).json({error:'internal server error'})
   }
}


const getAllvendors = async (req, res) => {
    try {
        const vendors=await Vendor.find().populate('firm');
        res.json({vendors});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const getVendorById=async(req,res)=>{
    const vendorId = req.params.apple;
    try{
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({message:'Vendor not found'});
        }
        res.json({vendor});

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'internal server error'});
    }
}


module.exports= {vendorRegister,vendorLogin,getAllvendors,getVendorById}

