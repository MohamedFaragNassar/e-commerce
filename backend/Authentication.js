const jwt = require("jsonwebtoken")
const  config =  require("./config")


const getToken = (user) =>{
   return jwt.sign({
        _id : user._id,
        userName: user.userName,
        password: user.password,
        isAdmin : user.isAdmin
    }, config.JWT_SECRET,{
        expiresIn: "24h"
    })
}

const isAuth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){

        jwt.verify(tokent, config.JWT_SECRET,(err, decodedToken)=>{
            if(err){
                res.status(401).send({message:"Invalid Token"})
            }
            req.user = decodedToken
            next()
            return
        })
    }else{
        res.status(401).send({message:"tocken not provided"})
    }

}


const isAdmin = (req,res,next)=>{
    if( req.user && req.user.isAdmin ){
        next()
        return
    }else{
        res.status(403).send({message: "Access denied"})
    }
}

module.exports = {getToken,isAuth,isAdmin}