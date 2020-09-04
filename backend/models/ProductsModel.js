const mongoose = require("mongoose")

const ProductShema = new mongoose.Schema({
    productName : {
        required:true,
        type: String
    },
    manufacturer:{
        type:String,
        required:true
    },
    category : {
        type:String,
        required : true
    },
    amount: {
        type:String,
        required : true
    },
    price:{
        type:String,
        required : true
    },
    specifications:{
        type:String,
        required:true
    }
},{timestamps:true}) 


const Product = mongoose.model("Products",ProductShema);

module.exports = Product ;