const  mongoose = require('mongoose')


const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required: true,
        unique:true
    },
    area:{
        type: String,
        required: true
    },
    category:{
        type:[
            {
                type:String,
                enum: ["veg","non-veg"] // multiple values
            }
        ]
    },
    region:{
        type:[
            {
                type: String,
                enum: ["south-indian","north-indian","chinese","bakery"]
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type: String
    },
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId, //when we use this method for type it forms a relation with other model
            ref: "Vendor" // firm relates with the vendor collection in database
        }
    ],

    products: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product" 
        }
    ]
})

const Firm = mongoose.model("Firm",firmSchema)

module.exports = Firm