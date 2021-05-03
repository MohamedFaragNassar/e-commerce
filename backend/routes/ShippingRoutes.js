const express = require("express")
const {isAdmin,isAuth} = require("../Authentication")
const Shipping = require("../models/ShippingModel")

const router = express.Router()

router.get("/",isAuth,async(req,res)=>{
    const user = req.user
    try{
        const shipping = await Shipping.findOne({user})
        if(shipping){
            res.send(shipping.shippingInfo)
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
        const shipping = await Shipping.findOne({user})

        if(shipping){
            const id = shipping._id;
            const prevShipping = shipping.shippingInfo;
            if(prevShipping.length > 0 ){
                shipping.shippingInfo = [...prevShipping,req.body]
            }else{
                shipping.shippingInfo = [...prevShipping,{...req.body,isDefault:true}]
            }
            const allShipping = await shipping.save()
            if(allShipping){
                res.send(allShipping.shippingInfo) 
            }
          
        }else{
            const newShipping = new Shipping({
                user,
                shippingInfo: {...req.body, isDefault:true},
            })

            const newLocation =  await newShipping.save()
            if(newLocation){
                res.send(newLocation.shippingInfo)
            }
        }
    }catch(error){
        res.status(500).send("error in adding shipping information")
    }
})

router.delete("/:id",isAuth,async(req,res)=>{
    const user = req.user
    const shippingID = req.params.id;
    const shipping = await Shipping.findOne({user})
    if(shipping){
        const filteredShipping = shipping.shippingInfo.filter(info => {return info._id != shippingID})
        shipping.shippingInfo = filteredShipping;
        const updatedShipping = await shipping.save();
        if(updatedShipping){
            res.json(updatedShipping.shippingInfo)
        }else{
            res.status(500).send("error in deleting shipping information")
        }
    }
    
    
})

router.put("/:id",isAuth,async(req,res) => {
    const user = req.user
    const shippingID = req.params.id;
    
    const shipping = await Shipping.findOne({user})
    const shippingInfo = shipping.shippingInfo.find(info => {return info._id == shippingID})
    shippingInfo.isDefault = true

    shipping.shippingInfo.forEach(element => {
        element.isDefault = false
    });
    
    shipping.shippingInfo = [...shipping.shippingInfo.filter(info => {return info._id != shippingID}),shippingInfo]
    const updatedShipping = await shipping.save();
    
    if(updatedShipping){
        res.json(updatedShipping.shippingInfo)
    }else{
        res.status(500).send("error in deleting shipping information")
    }
    
})

module.exports = router