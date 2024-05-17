const Vendor = require('../models/Vendor')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const dotEnv = require("dotenv")

dotEnv.config()

const secretKey = process.env.WhatISYourName


const vendorRegister = async (req,res)=>{
    const {username,email,password} = req.body;

    try{
        const vendorEmail = await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("Email Already Exists")
        }
        const hashedPassword = await bcrypt.hash(password,10) // 10 represents salt rounds which means how much time is required to calculate a single bcrypt hash.

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        })

        await newVendor.save()
        res.status(200).json({message: "Vendor Registered Sucessfully"})
        console.log("registered")
    }
    catch(err){
        return res.status(400).json({err: "Internal Server Err"})
        console.log(err)
    }
}


const vendorLogin = async(req,res)=>{
    const {email,password} = req.body

    try {
        const vendorEmail = await Vendor.findOne({email})
        if(!vendorEmail|| !(await bcrypt.compare(password,vendorEmail.password))){
            return res.status(400).json("Invalid Vendor")
        }

        const token = jwt.sign({vendorId: vendorEmail._id},secretKey,{expiresIn:"1h"})
        //here we generated jwtToken using vendorId
        return res.status(200).json({success: "Vendor Login Successful",token})
        console.log(email)
    }catch(err){
        return res.status(400).json("Internal server err")
        console.log(err)
    }
}

const getAllVendors = async (req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm') // here we want to show the records from firm collections to vendor collection
        //here we are showing firm records in vendor collection
        res.json({vendors})
    } catch (error) {
        return res.status(400).json("Internal server err")
        console.log(error)
    }

}

const getVendorById = async (req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')// if we given any collection name to populate it will show all the details of that collection
        //here we are showing firm records in vendor collection
        if(!vendor){
            return res.status(400).json({message:"vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        return res.status(400).json("Internal server err")
        console.log(error)
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById};