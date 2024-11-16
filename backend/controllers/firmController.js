const Firm=require('../models/Firm');
const Vendor=require('../models/Vendor')
const multer=require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


const addfirm =async(req,res)=>{
    try{
    const {firmname,area,category,region, offer}=req.body;
    const image=req.file?req.file.filename:undefined;
    const vendor= await Vendor.findById(req.vendorId);
    if(!vendor){
        return res.status(401).json({message:'vendor may not found'});
    }
    const firm= new Firm({
        firmname,area,category,region, offer,image,vendor:vendor._id

    });
    const filmsaved= await firm.save();
    vendor.firm.push(filmsaved);
    await vendor.save();
     return res.status(400).json({message:'firm added successfully'});
   }
   catch(error){
    console.log(error);
    return res.status(400).json({error:'error in adding the firm'});
   }

}
const deletefirmById= async(req,res)=>{
    try{
        const firmId=req.params.id;
        const firm=await Firm.findByIdAndDelete(firmId);
        if(!firm){
            return res.status(401).json({message:'firm may not found'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).json({error:'error in deleting the firm'});
    }
}
module.exports={addfirm: upload.single('image'),addfirm,deletefirmById};