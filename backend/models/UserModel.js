const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }

})

// dont forget to hash the password
UserSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt,)
        next();
} )



const user = mongoose.model("users",UserSchema)

module.exports= user;