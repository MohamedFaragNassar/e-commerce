const express =  require("express")
const Laptop =  require("../models/LaptopModel");
const Mobile =  require("../models/MobileModel");
const Product =  require("../models/ProductsModel");
const User =  require("../models/UserModel");
const Review =  require("../models/Review");
const fs = require("fs")
const {isAuth, isAdmin} = require("../Authentication");
const e = require("express");


const router = express.Router();

router.get("/info",async(req,res) =>{

    try{

        const mobile = await Mobile.find();
        const laptop = await Laptop.find();
        const other = await Product.find();
    
        const mobileBrands = [...new Set( mobile.map(item => item.manufacturer))]
        const mobileCpu = [...new Set( mobile.map(item => item.cpu))]
    
        const laptopBrands = [...new Set(laptop.map(item => item.manufacturer))]
        const laptopCpu = [...new Set(laptop.map(item => item.cpu))]
        const laptopGpu = [...new Set(laptop.map(item => item.gpu))]
    
        const otherBrands =  [...new Set(other.map(item => item.manufacturer))]

        res.json({
            mobileBrands,
            mobileCpu,
            laptopBrands,
            laptopCpu,
            laptopGpu,
            otherBrands
        })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }

})

router.get("/search",async(req,res)=>{
    const keyword = req.query.keyword
   
    if(keyword){
            try{
            const data1 = await Mobile.find({
                productName:{
                    $regex: new RegExp(keyword)
                    }
                },{
                   __v:0
                }).limit(5)
            
            const data2 = await Laptop.find({
                productName:{
                    $regex: new RegExp(keyword)
                    }
                },{
                    __v:0
                }).limit(5)
            
            const data3 = await Product.find({
                productName:{
                    $regex: new RegExp(keyword)
                    }
                },{
                    __v:0
                }).limit(5)
        
            res.send([...data1,...data2,...data3])

        }catch(err){
            console.log(err)
        }  
    }else{
        res.send([])
    }
   
    
})




router.get("/main", async (req,res)=>{
    
    const mobileProducts = await Mobile.find().sort([["rating",-1]]).limit(8)
    const laptopProducts = await Laptop.find().sort([["rating",-1]]).limit(8)
    const pcProducts = await Product.find({category:"pc"}).sort([["rating",-1]]).limit(8)
    const homeProducts = await Product.find({category:"home devices"}).sort([["rating",-1]]).limit(8)
    const other = await Product.find({category:"other"}).sort([["rating",-1]]).limit(8)
    if(mobileProducts && laptopProducts){
        const products =[["mobiles",mobileProducts],["laptops",laptopProducts],["pc hardwares",pcProducts]
                        ,["home devices",homeProducts],["other devices",other]]
        res.json(products)
    }
    else{
        res.status(400).send({msg:"error"});
    }
})

router.get("/allproducts", async (req,res)=>{
    
    const mobileProducts = await Mobile.find()
    const laptopProducts = await Laptop.find()
    const otherProducts = await Product.find()
    if(mobileProducts && laptopProducts && otherProducts){
        const pcProducts = otherProducts.filter(e => e.category == "pc hardware")
        const homeProducts = otherProducts.filter(e => e.category == "home devices")
        const other = otherProducts.filter(e => e.category == "other")
        const products = mobileProducts.concat([...laptopProducts,...pcProducts,...homeProducts,...other])
        res.json(products)
    }
    else{
        res.status(400).send({msg:"error"});
    }
})

router.post("/filter",async(req,res)=>{
    const keywords = req.body
    console.log(keywords)
    try{
        const mobile = await Mobile.find(keywords);
        const laptop = await Laptop.find(keywords);
        const other = await Product.find(keywords);

        const result = [...mobile,...laptop,...other]

        res.json(result) 
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
    
})


router.get("/category/:cat",async (req,res)=>{
    const category = req.params.cat
    let products;
    try{
        if(category === "mobile"){
            products = await Mobile.find()
       
        }else if(category === "laptops"){
            products = await Laptop.find()
      
        }else{
            const prods = await Product.find()
            products = prods.filter(prod=>{
            return prod.category === category;
            })
        }
        
        if(products){
          res.send(products)  
        }else{
            res.status(404).send("no such category")
        }

    }catch(error){
        console.log(error)
        res.status(500).send("error in getting category of products")
    }
  
    
    
})

router.get("/product/:id", async (req,res)=>{

    const id = req.params.id;
    let product;
    try{

        if(await Mobile.findById(id)){
            product = await  Mobile.findById(id)
        }
        else if(await Laptop.findById(id)){
            product = await  Laptop.findById(id)
        }
        else{
            product = await  Product.findById(id)
        }
    }catch(err){
        console.log(err)
    }
    
    console.log(product)
     res.send(product)

})






router.post("/add/:model",isAuth,isAdmin, async (req,res)=>{
    const model = req.params.model;
    
    console.log(model)
    let prod;
    if(model==="mobile"){
        prod = new Mobile({
            productName: req.body.productName,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            amount: Number(req.body.amount),
            price: Number(req.body.price),
            cpu: req.body.cpu,
            ram: Number(req.body.ram),
            storage: Number(req.body.storage),
            display: req.body.display,
            specifications: [...req.body.specifications],
            discription: req.body.discription,
            mainImage: req.body.image,
            images: [...req.body.images],
            
        })
    }else if(model === "laptops"){
        prod = new Laptop({
            productName: req.body.productName,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            amount:  Number(req.body.amount),
            price: Number(req.body.price),
            cpu: req.body.cpu,
            gpu: req.body.gpu,
            ram: Number(req.body.ram),
            storage: Number(req.body.storage),
            display: req.body.display,
            specifications:[...req.body.specifications],
            discription: req.body.discription,
            mainImage: req.body.image,
            images: [...req.body.images],
            
            })
    }
    else{
            prod = new Product({
                productName: req.body.productName,
                manufacturer: req.body.manufacturer,
                category: req.body.category,
                amount:  Number(req.body.amount),
                price: Number(req.body.price),
                specifications: [...req.body.specifications],
                discription: req.body.discription,
                mainImage: req.body.image,
                images: [...req.body.images],
            })
        }
        try{
            const newProd = await prod.save()
            console.log(newProd)
            if(newProd){
                res.send("success")
            }
        }catch(error){
            console.log(error)
            res.status(500).send("error in adding new product")
        }
})

router.delete("/delete/:id",isAuth,isAdmin,async(req,res)=>{
    const id = req.params.id;
     if(await Mobile.findById(id)){
         const prod = await Mobile.findById(id)
         if(prod){
            try{
             const path = "./"+prod.mainImage
            // fs.unlinkSync(path)
         }catch(err){
             console.log(err)
         } 
         }
         const deletedProduct = await  Mobile.findByIdAndDelete(id)
         res.send(deletedProduct._id)
         
        }
        else if(await Laptop.findById(id)){
            const deletedProduct = await Laptop.findByIdAndDelete(id)
            res.send(deletedProduct._id)
        }
        else{
            const deletedProduct = await Product.findByIdAndDelete(id)
        console.log(deletedProduct._id)
            res.send(deletedProduct._id)
        }
    
})

router.put("/edit/:model/:id",isAuth,isAdmin,async(req,res)=>{
    const id = req.params.id;
    const model = req.params.model
    let prod
    try{
    if(model==="mobile"){
            prod = await Mobile.findByIdAndUpdate(id,{
                productName: req.body.productName,
                manufacturer: req.body.manufacturer,
                category: req.body.category,
                amount: Number(req.body.amount),
                price: Number(req.body.price),
                cpu: req.body.cpu,
                ram: Number(req.body.ram),
                storage: Number(req.body.storage),
                display: req.body.display,
                specifications: req.body.specifications,
                discription: req.body.discription,
                
            },{useFindAndModify:false})
    }else if(model === "laptops"){
        prod = await Laptop.findByIdAndUpdate(id,{
            productName: req.body.productName,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            amount: Number(req.body.amount),
            price: Number(req.body.price),
            cpu: req.body.cpu,
            gpu: req.body.gpu,
            ram: Number(req.body.ram),
            storage: Number(req.body.storage),
            display: req.body.display,
            specifications: req.body.specifications,
            discription: req.body.discription,
            
        },{useFindAndModify:false})
       
    }else{
        prod = await Product.findByIdAndUpdate(id,{
            productName: req.body.productName,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            amount:  Number(req.body.amount),
            price: Number(req.body.price),
            specifications: req.body.specifications,
            discription: req.body.discription,
            mainImage: req.body.image,
            images: [...req.body.images],
        },{useFindAndModify:false})
    }
    
   
        res.send('success')
        console.log("product updated")
    
    }catch(err){
        console.log(err)
        res.status(500).send({message:"error in updating product"})
    } 
   
})

router.post("/review",isAuth,async(req,res)=>{
    const {rating,comment,id} = req.body
    const user = req.user;
    
    try{
        const check = await Review.find({user:req.user._id,productID:id})
        if(check.length>0){
            res.status(401).send("you have already reviewed this product")
        }else{
            const newReview = await Review.create({
                user,
                productID:id,
                rating,
                comment
            })
            res.send(newReview)
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get("/review/:id",async(req,res)=>{
    const id = req.params.id
    Review.find({productID:id})
    .populate(
     "user",
     "firstName lastName _id image",
     User,
    )
    .exec(function (err, reviews) {
        if(err){
            console.log(err)
        }  
        res.send(reviews)
    });
})

router.delete("/review/:id",isAuth,async(req,res)=>{
    const id = req.params.id
    try{
        const review = await Review.findById(id)
        if(req.user._id == review.user){
            review.comment = null
            await review.save()
            res.send("success")
        }else{
            res.status(401).send("Not Authorized action")
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})




module.exports = router;
