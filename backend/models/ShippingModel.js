const mongoose = require("mongoose")

const shippingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{type:String, required:true},
    country:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    postalcode: {type:String,required:true},
    isDefault: {type:Boolean,default:false}
})

const Shipping = mongoose.model("shippingInfo",shippingSchema)

module.exports = Shipping;