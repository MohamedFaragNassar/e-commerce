const { request } = require("express")
const express = require("express")
const {isAdmin,isAuth} = require("../Authentication")
const router = express.Router()
const Order = require("../models/OrderModel")
const Shipping = require("../models/ShippingModel")
const User = require("../models/UserModel")
const stripe = require("stripe")("sk_test_51K5lTIESHV2Ml2kkGTBRtDWD5lMjI0SOrFUjvpJhUuaoDCYYFxA5RyvkvCkuPKRKgLBuHHomsD1Yd1np1M2KPsc200Pyk1ijfh")



router.post("/add", isAuth,async(req,res)=>{
    const user = req.user
    try{

        const shipping = await Shipping.findById(req.body.shipping)
        const order = new Order({
            user: req.user,
            orderItems: req.body.orderItems,
            shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            tax:req.body.tax,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
        })
    
        const newOrder = await order.save()
        if(newOrder){
            console.log("made new order")
            res.json(newOrder)
        }
        
    }catch(error){
        console.log(error)
        res.status(500).send("error in adding new order")
    }

})


router.get("/",isAuth,async(req,res)=>{
    const user = req.user
    try{
        const orders = await Order.find({user})
        if(orders){
            res.send(orders)
        }
    }catch(error){
        console.error(error)
        res.status(500).send("error in getting orders")
    }
})

router.get("/all",isAuth,isAdmin,async(req,res)=>{
    try{
        const orders = await Order.find()
        if(orders){
            res.send(orders)
        }else{
            res.status(400).status("somthing went wrong")
        }
    }catch(error){
        console.log(error)
        res.status(500).send("error in getting orders data")
    }
})

router.get("/orderdetails/:id",isAuth,async(req,res)=>{
    const id = req.params.id
    try{
        const order = await Order.findById(id)
        const loc = await Shipping.findById(order.shipping)
        order.shipping = loc
        res.send(order)
        
    }catch(error){
        console.error(error)
        res.status(500).send("error in getting order details")
    }
})

router.delete("/cancelorder/:id",isAuth,async(req,res)=>{
    const id = req.params.id;
    try{
        const order = await Order.findById(id)
        if(order){
            const deletedOrder = await order.remove()
            if(deletedOrder){
                console.log("order deleted")
                res.send(deletedOrder._id)
            }
        }else{
            res.status(400).send("no such order")
        }
    }catch(error){
        console.log(error)
        res.status(500).send("error in deleting order")
    }
})


router.delete("/deleteorder/:id",isAuth,isAdmin,async(req,res)=>{
    const id = req.params.id;
    try{
        const order = await Order.findById(id)
        if(order){
            const deletedOrder = await order.remove()
            if(deletedOrder){
                console.log("order deleted")
                res.send(deletedOrder._id)
            }
        }else{
            res.status(400).send("no such order")
        }
    }catch(error){
        console.log(error)
        res.status(500).send("error in deleting order")
    }
})

router.patch("/deliver",isAuth,isAdmin,async(req,res)=>{
    const {id} = req.body
    try{
        const order = await Order.findById(id)
        /* if(!order.isPaid){
            res.status(400).send("order must be paid before made it delivered")
        } */
        order.isDelivered = true
        const updatedOrder = await order.save()
        if(updatedOrder){
            console.log("order delivered")
            res.send("success")
        }
    }catch(err){
        console.log(error)
        res.status(500).send(err)
    }
})

router.post("/pay",isAuth,async(req,res)=>{
    const {id} = req.body
    console.log("payyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    try{
        const order = await Order.findById(id)
        if(order.isPaid){
            res.status(400).send("We recieved the payments of this order")
        }
        order.isPaid = true
        const updatedOrder = await order.save()
        if(updatedOrder){
            console.log("order payed")
            res.send("success")
        }
    }catch(err){
        console.log(error)
        res.status(500).send(err)
    }
})


const calculateOrderAmount = (order) => {
    console.log(order)
    return 1400;
  
  };

router.post("/payment/stripe",isAuth,async(req,res) => {
    const { id } = req.body;
    const order = await Order.findById(id)
    const total = order.totalPrice * 100
    console.log(id)
    console.log(total)
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total ,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
   }catch(err){
       console.log(err)
   }
})






module.exports = router;