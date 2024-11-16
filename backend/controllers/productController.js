const Product=require('../models/Product');
const multer=require('multer');
const Firm =require('../models/Firm');
const { findByIdAndDelete } = require('../models/Vendor');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const addProduct= async (req, res)=>{
    try{
    const {productName,price,category, bestseller, description}=req.body;
    const image=req.file?req.file.filename:undefined;
    const firmId=req.params.firmId;
    const firm= await Firm.findById(firmId);
    if(!firm) {return res.status(404).send({message:'Firm not found'});}

    const  product=new Product({
        productName,price,category,bestseller,description,image,firm:firm._id
    })
    const savedproduct = await product.save();
    firm.products.push(savedproduct);
    res.status(201).send({message:'Product added successfully',savedproduct});
    await firm.save();

    }
    catch(error){
        console.log(error);
        res.status(400).json({message:error.message});
    }
    }
    const getProductById= async(req,res)=>{
        try{
            const firmId=req.params.firmId;
            const firm=await Firm.findById(firmId);
               if(!firm){
                return res.status(404).send({message:'firm not found'});
               }
               const RestaurantName = firm.firmname;
               const products= await Product.find({firm:firmId});
               res.status(200).send({RestaurantName, products});
        }
        catch(error){
            console.log(error);
            res.status(400).json({message:error.message});
    
        }
    }
    const deleteproductById= async(req,res)=>{
        try{
            const productId=req.params.productId;
            const deletedproduct= await Product.findByIdAndDelete(productId)  
           if(!deletedproduct){
            return res.status(404).send({message:'product not found'});
            }
       }
        catch(error){
            console.log(error);
            res.status(401).json({error:'error at deleting product'});
        }
    }
    module.exports={addProduct:[upload.single('image'), addProduct],getProductById,deleteproductById};