const mongoose = require("mongoose")

const MobileShema = new mongoose.Schema({
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
    specifications:{
        proccessor:{
            type:String,
            required:true
        },
        ram:{
            type:String,
            required:true
        },
        screen:{
            type:Number,
            required:true
        },
        dimentions:{
            type:Number,
            required:true
        },
        battery:{
            type:Number,
            required:true
        },
        mainCamera:{
            type:Number,
            required:true
        },
        frontCamera:{
            type:Number,
            required:true
        },
        otherSpecs:{
            type:Number,
        }
        
    }
},{timestamps:true}) 


const mobile = mongoose.model("mobiles",MobileShema);

module.exports = mobile ;