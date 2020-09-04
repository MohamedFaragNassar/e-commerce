const express =  require("express")
const Product =  require("../models/ProductsModel");
const { resolveInclude } = require("ejs");

const router = express.Router();

router.get("/",(req,res)=>{
    const products = Product.find()
            .then(result => res.send(result))
            .catch(err => console.log(err))
})

router.get("/:id",(req,res)=>{
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

module.exports = router;
