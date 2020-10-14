const express =  require("express")
const Laptop =  require("../models/LaptopModel");
const Mobile =  require("../models/MobileModel");
const Product =  require("../models/ProductsModel");
const multer = require("multer");
const fs = require("fs")




const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./uploads/")
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ '-'+file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
        cb(null,true)
    }else{
        cb(new Error("file type error"),false)
    }

}



 const upload = multer({storage}) ;
    


const router = express.Router();


router.get("/main", async (req,res)=>{
    
    const mobileProducts = await Mobile.find()
    const laptopProducts = await Laptop.find()
    const otherProducts = await Product.find()
    if(mobileProducts && laptopProducts && otherProducts){
        const products = mobileProducts.concat(laptopProducts,otherProducts)
        res.send(products)
    }
    else{
        res.status(400).send({msg:"error"});
    }
})


router.get("/category/:cat",async (req,res)=>{
    const category = req.params.cat
    let products;
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
    
    res.send(products)
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
    
     res.send(product)

    /*
    const prod = Product.findOne({_id:req.params.id})
                .then(result =>res.send(result))
                .catch(err=>console.log(err))
                */
})

router.post("/add/:model",upload.single("mainImage"), (req,res)=>{
    const model = req.params.model;
    console.log(req.files)
    
    let prod;
    if(model==="mobile"){
        prod = new Mobile({
            productName: req.body.productName,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            amount: req.body.amount,
            price: req.body.price,
            cpu: req.body.cpu,
            ram: req.body.ram,
            storage: req.body.productName,
            display: req.body.display,
            specifications: req.body.specifications,
            discription: req.body.discription,
            mainImage: req.file.filename,
            
        })
    }else if(model === "laptop"){
        prod = new Laptop({
            productName: req.body.productName,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            amount: req.body.amount,
            price: req.body.price,
            cpu: req.body.cpu,
            gpu: req.body.gpu,
            ram: req.body.ram,
            storage: req.body.productName,
            display: req.body.display,
            specifications: req.body.specifications,
            discription: req.body.discription,
            mainImage: req.file.filename,
            
            })
    }
    else{
            prod = new Product({
                productName: req.body.productName,
                manufacturer: req.body.manufacturer,
                category: req.body.category,
                amount: req.body.amount,
                price: req.body.price,
                specifications: req.body.specifications,
                discription: req.body.discription,
                mainImage: req.file.filename,
            })
        }
    const newProd = prod.save()
        .then(res.redirect("/manage"))
        .catch(err=>console.log(err))
})

router.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
     if(await Mobile.findById(id)){
         const prod = await Mobile.findById(id)
         if(prod){
            try{
             const path = "./"+prod.mainImage
             fs.unlinkSync(path)
         }catch(err){
             console.log(err)
         } 
         }
         await  Mobile.findByIdAndDelete(id)
         res.json({redirect:"/manage"})
         
        }
        else if(await Laptop.findById(id)){
            await Laptop.findByIdAndDelete(id)
            res.json({redirect:"/manage"})
        }
        else{
            await Product.findByIdAndDelete(id)
            res.json({redirect:"/manage"})
        }
    
})

router.post("/edit/:id",async(req,res)=>{
    const id = req.params.id;
    let product;
    
    try{

        if(await Mobile.findById(id)){
            
               product =  await  Mobile.findByIdAndUpdate(id,{
                    category:req.body.category,
                    productName: req.body.productName,
                    manufacturer: req.body.manufacturer,
                    category: req.body.category,
                    amount: req.body.amount,
                    price: req.body.price,
                    cpu: req.body.cpu,
                    ram: req.body.ram,
                    storage: req.body.productName,
                    display: req.body.display,
                    specifications: req.body.specifications,
                    discription: req.body.discription,
               },{useFindAndModify:false})
               
           }
           else if(await Laptop.findById(id)){
                product = await Laptop.findByIdAndUpdate(id,{
                        category:req.body.category,
                        productName: req.body.productName,
                        manufacturer: req.body.manufacturer,
                        category: req.body.category,
                        amount: req.body.amount,
                        price: req.body.price,
                        cpu: req.body.cpu,
                        gpu: req.body.gpu,
                        ram: req.body.ram,
                        storage: req.body.productName,
                        display: req.body.display,
                        specifications: req.body.specifications,
                        discription: req.body.discription,
                    },{useFindAndModify:false})
                
           }
           else{
                product = await Product.findByIdAndUpdate(id,{
                   category:req.body.category,
                   productName: req.body.productName,
                   manufacturer: req.body.manufacturer,
                   category: req.body.category,
                   amount: req.body.amount,
                   price: req.body.price,
                   specifications: req.body.specifications,
                   discription: req.body.discription,
                },{useFindAndModify:false})
               
           }
    }catch(err){console.log(err)}
    
    if(product){
        res.redirect('/manage')
        console.log("product updated")
    }
    else{
        res.status(500).send({message:"error in updating product"})
    }
   
})

module.exports = router;
