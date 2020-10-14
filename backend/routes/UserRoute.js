const express = require("express")
const User = require("../models/UserModel")
const {getToken} = require("../Authentication");
const bcrypt = require("bcrypt");


const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const users = await User.find()
        res.send(users)
    }catch(err){
        console.log(err)
    }
    
})

router.post("/signin", async (req,res)=>{
    const {email, password} = req.body;
    const signedUser = await User.findOne({email})
    if(signedUser){
        const auth = await bcrypt.compare(password, signedUser.password)
        if(auth){
            res.send({
                userID: signedUser._id,
                userName: signedUser.userName,
                isAdmin: signedUser.isAdmin,
                token: getToken(signedUser)
            })
            
        }else{
            res.status(400).send("incorrect password")
        }
    }else{
        res.status(400).send("Email not found")
    }    
 })

router.post("/register",(req,res)=>{
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
        .then(res.redirect("/"))
        .then(console.log("user added"))
        .catch(err => console.log(err))
})

module.exports = router
