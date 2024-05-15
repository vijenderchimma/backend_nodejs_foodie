const Vendor = require('../models/Vendor')

const jwt = require('jsonwebtoken')

const dotEnv = require('dotenv')

dotEnv.config()
const secretKey = process.env.WhatIsYourName

const verifyToken = async(req,res,next)=>{ //if response is ok then only next function accepts us to perform other operations.
    const token = req.headers.token
    console.log(token)

    if(!token){
        return res.status(401).json({error: "Token is Required"})
    }
    try {
        const decoded = jwt.verify(token,secretKey) // this decoded token returns vendorId that we used to generate token
        const vendor = await Vendor.findById(decoded.vendorId) 
        //here we are verifying it by using vendorId because we generated jwtToken by using vendorId
        if (!vendor){
            return res.status(404).json({err: "vendor not found"})
        }
        req.vendorId = vendor._id // here we are comparing decoded vendorId with database id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:"Invalid Token"})
    }
}


module.exports = verifyToken