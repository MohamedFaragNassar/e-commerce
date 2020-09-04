const mongoose = require("mongoose");
const express = require("express")
const productRout = require("./routes/ProductsRoute");
const { urlencoded } = require("express");

const mongoDB_URl = "mongodb://127.0.0.1:27017/e-commerce";
const port = process.env.port || 5000;
const app = express("");


app.use(express.static("public"))
app.use(urlencoded({extended:false}))

app.use('/products' , productRout);


mongoose.connect(mongoDB_URl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},) 
        .then(app.listen(port,()=>{console.log("server connected")}))
        .catch(err => console.log(err))

app.get("/",(req,res)=>{
    res.send("mmmmmmmmmmmmmmmmmmmmmmmmm")
})




