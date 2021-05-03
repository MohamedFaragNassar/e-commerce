const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        unique:true,
    },
    answer:{
        type:String,
        unique:true,
    },
    
    
},{timestamps:true})

const Question = mongoose.model("questions",QuestionSchema)

module.exports= Question;