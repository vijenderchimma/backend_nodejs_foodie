const multer = require('multer')
const ProductModel = require('../models/Product')
const Firm = require('../models/Firm')
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


const addProduct = async (req,res) =>{
    try {
        const {productName, price, category, bestseller, description} = req.body

        const image = req.file ? req.file.filename : undefined
        console.log(image)

        const firmId = req.params.firmId

        const firm = await Firm.findById(firmId)

        if (!firm){
            return res.status(404).json({message: 'Firm Not Found'})
        }

        const newProduct = new ProductModel({
            productName, price, category, bestseller, description,image,firm: firm._id
        })

        const savedProduct = await newProduct.save()

        firm.products.push(savedProduct)

        await firm.save()

        res.status(200).json(savedProduct)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server'})
    }
}


const getProductByFirm = async (req,res) =>{
    try {
        const firmId = req.params.firmId

        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({message: "Firm Not Found"})
        }

        const restaurantName = firm.firmName
        const products = await ProductModel.find({firm: firmId})

        res.status(200).json({restaurantName,products})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server'})
    }
}


const deleteProductById = async (req,res)=>{
    try {
        const productId = req.params.productId
        const deletedProduct = await ProductModel.findByIdAndDelete(productId)
        if (!deletedProduct) {
            return res.status(404).json({message: "Product Not Found"})
        } 

        res.status(200).json({message: "Product deleted Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server'})
    }
}


module.exports = {addProduct: [upload.single('image'),addProduct],getProductByFirm,deleteProductById}