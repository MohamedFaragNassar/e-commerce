const express =  require("express")
const {isAuth, isAdmin} = require("../Authentication");
const Product = require("../models/ProductsModel");
const Wishlist = require('../models/WishlistModel');
const Mobile = require("../models/MobileModel")
const Laptop = require("../models/LaptopModel")
const Other = require("../models/ProductsModel")

const router = express.Router();

router.post("/",isAuth,async(req,res)=>{
   const user = req.user;
   product = req.body.product;
   const wishlist = await Wishlist.findOne({user})
   
   
   try{
        if(wishlist){
            const id = wishlist._id;
            prevProducts = wishlist.products;
            await Wishlist.findByIdAndUpdate(id,{
                user,
                products:[...prevProducts,product]
            },{useFindAndModify:false})
            console.log("added product to the wishlist")
            res.send("added product to the wishlist")
        }else{
            const newProduct = new Wishlist({
                user,
                products: product,
            })

            await newProduct.save()
            console.log("created new wishlist")
            res.send("created new wishlist")

        }
    }catch(err){
        console.log(err)
        res.status(500).send("error in creating the wishlist")
    }
   
})

router.get("/",isAuth,async(req,res) => {
    const user = req.user;
    try{
      const userWishlist = await Wishlist.findOne({user})

      if(userWishlist){
         const {products} = userWishlist
          const wishlistMobile = await Mobile.find({_id:products})  
          const wishlistLaptop = await Laptop.find({_id:products})  
          const wishlistOther = await Other.find({_id:products})  
          const wishlist = [...wishlistMobile,...wishlistLaptop,...wishlistOther]
          res.send(wishlist)
      }
      
    }catch(err){
        console.log(err)
        res.status(500).send("error in getting the wishlist")
    }
    
})

router.delete("/deletewishlist",isAuth,async(req,res) =>{
    const user = req.user;
    try{
        const wishlist = await Wishlist.findOneAndDelete({user},{useFindAndModify:false})
        res.send("wishlist deleted")
    }catch(err){
        console.log(err)
        res.status(500).send("error in deleting the wishlist")
    }

})

router.post("/deleteproduct",isAuth,async(req,res) => {
    const user = req.user;
    const productID = req.body.productID
    try{
    const wishlist = await Wishlist.findOne({user})
    const id = wishlist._id;
    const oldProducts = wishlist.products;
    const newProducts = oldProducts.filter((prod)=>{
        return prod != productID
    })
    const updatedWishlist = await Wishlist.findByIdAndUpdate(id,{
        user,
        products:newProducts
    },{useFindAndModify:false})

    res.send("product deleted from the wishlist")
    }catch(err){
        console.log(err)
        res.status(500).send("error in deleting the product from the wishlist")
    }
    
})


module.exports = router;
