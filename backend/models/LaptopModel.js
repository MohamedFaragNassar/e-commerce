const mongoose = require("mongoose")

const saleSchema = new mongoose.Schema({
    salePercentage:{type:Number,required:true,default : 0},
    salePrice:{type:Number,required:true,default:0},
    endDate:{type:Date,},

})


const LaptopSchema = new mongoose.Schema({
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
        type:Number,
        required : true
    },
    price:{
        type:Number,
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
        type:Number,
        required:true
    },
    storage:{
        type:Number,
        required:true
    },
    display:{
        type:String,
        required:true
    },
    specifications:[{
        spec:{type:String,required:true},
        value:{type:String,required:true},
    }],
    discription:{
        type:String,
        required:true
    },
    mainImage:{
        type: String,
        //required: true
    },
    images:[
        {type: String,}
   ],
   rating:{
       type: Number,
       default:0,
       required:true
   },
   onSale:{ type: Boolean, default: false},
   sale:saleSchema,
},{timestamps:true}) 


const laptop = mongoose.model("laptops",LaptopSchema);

module.exports = laptop ;