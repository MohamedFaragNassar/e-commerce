const mongoose = require("mongoose");
const express = require("express")
const productRout = require("./routes/ProductsRoute");
const UserRout = require("./routes/UserRoute");
const { urlencoded } = require("express");
const bodyParser = require("body-parser");

const mongoDB_URl = "mongodb://127.0.0.1:27017/e-commerce";
const port = process.env.port || 5000;
const app = express("");

    
app.use(express.static("public"))
app.use(express.static("uploads"))
app.use(urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/' , productRout);
app.use('/users' , UserRout);


mongoose.connect(mongoDB_URl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},) 
        .then(app.listen(port,()=>{console.log("server connected")}))
        .catch(err => console.log(err))





