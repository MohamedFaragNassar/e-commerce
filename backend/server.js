const mongoose = require("mongoose");
const express = require("express")
const productRout = require("./routes/ProductsRoute");
const UserRoute = require("./routes/UserRoute");
const wishlistRoute = require("./routes/WishlistRoutes");
const uploadRoute = require("./routes/uploadRoute");
const Oredersroute = require("./routes/OrdersRoute");
const ShippingRoute = require("./routes/ShippingRoutes");
const QuestionsRoute = require("./routes/QuestionsRoute");
const { urlencoded } = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron")
const Mobile = require("./models/MobileModel")
const Laptop = require("./models/LaptopModel")
const Product = require("./models/ProductsModel");
const mobile = require("./models/MobileModel");
const path = require("path")

const mongoDB_URl = "mongodb+srv://mnassar:nassar5050@tu-blogs.7sokl.mongodb.net/eshop?retryWrites=true&w=majority";
//const port = process.env.port || 5000;
const app = express("");

    
app.use(express.static("public"))
app.use(express.static("uploads"))
app.use(urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/api/' , productRout);
app.use('/api/users' , UserRoute);
app.use('/api/wishlists' , wishlistRoute);
app.use('/api/orders' , Oredersroute);
app.use('/api/shipping' , ShippingRoute);
app.use('/api/upload' , uploadRoute);
app.use('/api/questions' , QuestionsRoute);

 /* cron.schedule('0 0 * * *', async()=> {
        console.log('running a task every minute');
        const mobiles = await Mobile.find({onSale:true})
        const laptops = await Laptop.find({onSale:true})
        const other = await Product.find({onSale:true})

        mobiles.map(async(product) =>{
                if(product.sale.endDate <= Date.now() ){
                        product.onSale = false
                        product.sale = {}
                        await product.save()
                }
        })
        laptops.map(async(product) =>{
                if(product.sale.endDate <= Date.now() ){
                        product.onSale = false
                        product.sale = {}
                        await product.save()
                }
                
        })
        other.map(async(product) =>{
                if(product.sale.endDate >= Date.now() ){
                        product.onSale = false
                        product.sale = {}
                        await product.save()
                }
        })
      });
 
 */

if (process.env.NODE_ENV === "production"){
app.use(express.static(path.resolve(__dirname,'../frontend/build')));

app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'));
})
}
      
mongoose.connect(mongoDB_URl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},) 
        .then(app.listen(process.env.PORT || 5000,()=>{console.log("server connected")}))
        .catch(err => console.log(err))





