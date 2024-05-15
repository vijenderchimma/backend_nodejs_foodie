const express = require("express")

const dotEnv = require("dotenv")

const app = express() //it initializes the express application and creating the application instance
const bodyParser= require('body-parser')
const mongoose  = require("mongoose")
const venderRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')

const productRoutes = require('./routes/productRoutes') 

const path = require('path') // it is an inbuilt module in nodejs

const Port = 4000

dotEnv.config() //to load environment variables from the .env file example api keys, passwords etc.

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected Successfully")) 
.catch((err)=>console.log(err))

app.use(bodyParser.json()) //middleware function

app.use('/vendor',venderRoutes) // we have written a middleware function in vendorcontroller.js and routed using vendor routes
app.use('/firm',firmRoutes)

app.use('/products',productRoutes)
//localhost:4000/venodor/register we can test code in postman

app.use('/uploads',express.static('uploads'))

app.listen(Port, () =>{
    console.log(`Server Running at ${Port}`)
})

app.use("/home", (req,res)=>{
    res.send("<h1>Welcome to the Foodie's</h1>")
})
