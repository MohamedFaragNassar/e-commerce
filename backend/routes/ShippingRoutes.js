const express = require("express")
const {isAdmin,isAuth} = require("../Authentication")
const Shipping = require("../models/ShippingModel")

const router = express.Router()

router.get("/",isAuth,async(req,res)=>{
    const user = req.user
    try{
        const shipping = await Shipping.find({user})
        if(shipping){
            res.send(shipping)
        }else{
            res.status(404).send("no shipping info for this account")
        }
    }catch(error){
        console.log(error)
        res.status(500).send("error in getting shipping info")
    }
})

router.post("/",isAuth,async(req,res)=>{
    const user = req.user
    try{
        const check = await (await Shipping.find({user})).length > 0
        const newShipping = await Shipping.create({
            user,
            name:req.body.name,
            country:req.body.country,
            city:req.body.city,
            address:req.body.address,
            postalcode: req.body.postalcode,
            isDefault: !check 
        })
        res.send(newShipping)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete("/:id",isAuth,async(req,res)=>{
    const shippingID = req.params.id;
    try{
        const delShipping = await Shipping.findByIdAndDelete(shippingID)
        res.send("success")
    }catch(error){
        res.status(500).send("error in adding shipping information")
    }
})

router.put("/",isAuth,async(req,res) => {
    const user = req.user
    const shippingID = req.body.id;
    
    try{
        const all = await Shipping.find({user})
        all.forEach(e => {
            if(e._id == shippingID){
                e.isDefault = true
                e.save()
            }else{
                if(e.isDefault){
                    e.isDefault = false
                    e.save()
                }
            }
        })
        
        res.send("success")
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
    
})

module.exports = router