const mongoose = require("mongoose")

const LaptopSchema = new mongoose.Schema({
    productName : {
        required:true,
        type: String
    },
    manufacturer:{
        type:Number,
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
    cpu:{
        type:String,
        required:true
    },
    gpu:{
        type:String,
        required:true
    },
    ram:{
        type:String,
        required:true
    },
    storage:{
        type:String,
        required:true
    },
    display:{
        type:String,
        required:true
    },
    specifications:{
        type:String,
        required:true
    },
},{timestamps:true}) 


const laptop = mongoose.model("laptops",MobileSchema);

module.exports = laptop ;