const multer = require("multer")
const express = require("express")
const {isAuth} = require("../Authentication")
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dt3fknrkp', 
    api_key: '678345384481827', 
    api_secret: 'XAFHdzWuHvyt_fdWseKhSFGUDdY' 
  });

const router = express.Router();

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
       return  cb(null,true)
    }else{
        cb(new Error("file type error"),false)
    }

}



 const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        fileFilter(req,file,cb)
    },
    }) ;
    

    router.post("/many",isAuth,upload.array("images"),async(req,res)=>{
            const files = req.files
            let fileNames = []
          
            for(let i=0;i<files.length;i++){
                await cloudinary.uploader.upload(files[i].path, function(error, result) {
                    if(error){
                        console.log(error)
                    }else{
                        fileNames.push(result.url)
                    }
                 });
            }

            res.send(fileNames)
        
    })





router.post('/',isAuth, upload.single('image'), (req, res) => {
    cloudinary.uploader.upload(req.file.path,function(error, result) {
        console.log(result)
        if(error){
            res.status(500).send(error)
        }else{
            res.send(result.url)
        }
    });
})


  
module.exports= router
  