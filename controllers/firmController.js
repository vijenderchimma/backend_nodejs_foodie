
const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // limit file size to 1MB
});

//here we need vendorId because we are adding firm and vendor based on vendorId

const addFirm = async (req,res) =>{
    try {
        const {firmName,area,category,region,offer} = req.body

        const image = req.file ? req.file.filename: undefined

        const vendor = await Vendor.findById(req.vendorId) // here we need vendor id so that is why we are using vendor to add with firm
        console.log(vendor) //  here we will get the req.vendorId from the verify token we had applied req.vendorId = vendor._id 
        //So that is why we will get the vendor id after executing the verify token file.

        if (!vendor){
            return res.status(404).json({message: "Vendor Not Found"})
        }

        const firm = new Firm({
            firmName,area,category,region,offer,image,vendor: vendor._id
        })

        const savedFirm = await firm.save()

        vendor.firm.push(savedFirm)

        await vendor.save()


        return res.status(200).json({message: "Firm Added Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

const deleteFirmById = async (req,res)=>{
    try {
        const firmId = req.params.firmId
        const deleteFirm = await Firm.findByIdAndDelete(firmId)
        if(!deleteFirm){
            return res.status(404).json({message: "Firm Not Found"})
        }
        res.status(200).json({message: "firm deleted Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById} // for addfirm method we sending image as as parameter
//when we are exporting with image we have to write function and send image as parameter for addFirm method