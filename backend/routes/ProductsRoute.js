const express =  require("express")
const Product =  require("../models/ProductsModel");


const router = express.Router();


router.get("/main",(req,res)=>{
    const products = Product.find()
            .then(result => res.send(result))
            .catch(err => console.log(err))
})


router.get("/category/:cat",(req,res)=>{
    const category = req.params.cat
    const products = Product.find()
            .then(result => res.send(result.filter(prod => {
                return prod.category == category
            })))
            .catch(err => console.log(err))
})

router.get("/product/:id",(req,res)=>{
    const prod = Product.findOne({_id:req.params.id})
                .then(result =>res.send(result))
                .catch(err=>console.log(err))
})

router.post("/add" , (req,res)=>{
    const prod = new Product({
        productName: req.body.productName,
        manufacturer: req.body.manufacturer,
        category: req.body.category,
        amount: req.body.amount,
        price: req.body.price,
        specifications: req.body.specifications
    })
    const newProd = prod.save()
        .then(console.log("product added"))
        .catch(err=>console.log(err))
})

router.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(result => res.json({redirect:"/manage"}))
        .catch(err=>console.log(err))
})

module.exports = router;
