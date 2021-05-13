const express = require("express")
const User = require("../models/UserModel")
const {getToken} = require("../Authentication");
const bcrypt = require("bcrypt");
const {isAdmin, isAuth} = require ("../Authentication");




const router = express.Router();

router.get("/",isAuth,isAdmin,async(req,res)=>{
    try{
        const users = await User.find()
        res.send(users)
    }catch(err){
        console.log(err)
    }
    
})

router.post("/signin", async (req,res)=>{
    const {email, password} = req.body;     
    try{

   
        const signedUser = await User.findOne({email})
        if(signedUser){
            
            const auth = await bcrypt.compare(password, signedUser.password)
            if(auth){
                res.send({
                    userID: signedUser._id,
                    firstName: signedUser.firstName,
                    lastName: signedUser.lastName,
                    isAdmin: signedUser.isAdmin,
                    userImage:signedUser.image,
                    token: getToken(signedUser)
                })
                
            }else{
                res.send("incorrect password")
            }
        }else{
            res.send("Email not found")
        }   
    }catch(error){
        console.log(error)
        res.status(500).send("Somthing went wrong when trying to sign you in")
    }
 })

 router.post("/readyaccount",async(req,res) => {
     try{
         const type = req.body.type
         const email = type == "admin" ? "mfnemo8@yahoo.com" : "mfnemo65@yahoo.com"
         const signedUser = await User.findOne({email})
         const auth = await bcrypt.compare("123", signedUser.password)
         if(auth){
            res.send({
                userID: signedUser._id,
                firstName: signedUser.firstName,
                lastName: signedUser.lastName,
                isAdmin: signedUser.isAdmin,
                userImage:signedUser.image,
                token: getToken(signedUser)
            })
            
        }else{
            res.send("incorrect password")
        }

     }catch(error){
        res.status(500).send("Somthing went wrong when trying to sign you in")
    }
})

router.post("/register",async(req,res)=>{
    const checkEmail = await User.findOne({email:req.body.email})
    if(checkEmail){
        res.send("This Email is already registered")
    }else{
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        try{
            const user = await newUser.save()
            if(user){
                res.send("success")
            }
        }catch(error){
            console.log(error)
            res.status(500).send({message:"Somthing went wrong when trying to register you, please try again"})
        }
        
    }
})

router.post("/admin",isAdmin,isAuth,(req,res)=>{
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
        
    })
    newUser.save()
        .then(res.send("added admin user"))
        .catch(err => console.log(err))
})

router.get("/profile",isAuth, async (req,res)=>{
    const id = req.user._id
    
    try{
        const user = await User.findById(id)
        if(user){
            res.json({
                userID: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userImage:user.image,
                isAdmin: user.isAdmin,
            })
        }
    }catch(err){
        console.log(err)
        res.status(401).send("error in getting user data")
    }
    
})

router.put("/profile",isAuth,async(req,res)=>{
    const id =req.user._id;
    const user = await User.findByIdAndUpdate(id,{
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    })
    
    if(user){
        res.send("success")
    }else{
        res.status(500).send("error in updating user data")
    }
    
})

router.put("/changepassword",isAuth,async(req,res) => {
    const id =req.user._id;
    const user = await User.findById(id)
    const auth = await bcrypt.compare(req.body.old, user.password)
    if(auth){
        user.password = req.body.password
        await user.save()
        res.send({
            userID: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            userImage:user.image,
            token: getToken(user)
        })
    }else{
        res.status(403).send("the password you provided is incorrect")
    }
})


router.delete("/delete/:id",isAuth,isAdmin,async(req,res)=>{
    const id = req.params.id
    
    try{
       const deletedUser =  await User.findByIdAndDelete(id)
       if(deletedUser){
           res.send(deletedUser._id)
       }
    }catch(err){
        res.status(500).send("error in deleting the user")
    }
})

router.patch("/image",isAuth,async(req,res)=>{
   const image = req.body.image
   console.log(image)
   const id = req.user._id
   if(image){
      try{
        const user = await User.findByIdAndUpdate(id,{
            image
        },{useFindAndModify:false})
        res.send("success")
       }catch(err){
            console.log(err)
            res.status(500).send(err)
        } 
   }else{
       res.status(400).send("no image provided")
   }
    
})


module.exports = router
