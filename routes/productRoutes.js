const express = require('express')
const {addProduct, getProductByFirm, deleteProductById} = require('../controllers/productController')

const router = express.Router()

router.post('/add-product/:firmId',addProduct)
router.get('/get-products/:firmId',getProductByFirm)


router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName // the name we are stored in database comes in place of imageName
    req.headers('Content-type', 'image/jpeg')
    req.sendFile(path.join(__dirname, '..', 'uploads',imageName))
})// here we have to mention the uploads folder and image name we have stored in the uploads folder

router.delete('/:productId',deleteProductById)

module.exports = router