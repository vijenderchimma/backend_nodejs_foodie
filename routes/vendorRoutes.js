
const {vendorRegister, vendorLogin,getAllVendors,getVendorById} = require('../controllers/vendorController')

const express = require('express')

const router = express.Router()//in-built method route the details

router.post('/register', vendorRegister) // vendorRegister is a method we have written in vendorController
//'/register' is an endpoint with localhost:4000/venodor/register we can test code in postman

router.post("/login", vendorLogin)
router.get('/all-vendors',getAllVendors)
router.get('/single-vendor/:id',getVendorById)
module.exports = router
//we created API using post method so we cannot test it in browser