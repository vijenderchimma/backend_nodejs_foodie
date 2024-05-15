
const express = require('express')

const firmController = require('../controllers/firmController')
//we are adding firm on token based for that purpose we verified token in middleware 
//so we have to import it

const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()// to create routes

router.post('/add-firm', verifyToken,firmController.addFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName // the name we are stored in database comes in place of imageName
    req.headers('Content-type', 'image/jpeg')
    req.sendFile(path.join(__dirname, '..', 'uploads',imageName))
})// here we have to mention the uploads folder and image name we have stored in the uploads folder

router.delete('/:firmId',firmController.deleteFirmById)
module.exports = router