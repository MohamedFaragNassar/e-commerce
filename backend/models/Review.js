const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user:       {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    productID:  {type:String,required:true},
    rating:     {type:Number,required:true},
    comment:    {type:String}
},{timestamps:true})

const Review = mongoose.model("reviews",reviewSchema)

module.exports= Review;