const mongoose = require("mongoose")

const MobileShema = new mongoose.Schema({
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
    cpu:{
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


const mobile = mongoose.model("mobiles",MobileShema);

module.exports = mobile ;