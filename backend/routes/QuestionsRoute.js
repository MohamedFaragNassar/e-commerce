const express =  require("express")
const Question =  require("../models/QuestionModel");
const {isAuth, isAdmin} = require("../Authentication");


const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const questions = await Question.find()
        res.json(questions)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post("/",isAuth,isAdmin,async(req,res)=>{
    try{
        const newQuestion = await Question.create({
            question:req.body.question,
            answer:req.body.answer
        })
        res.json(newQuestion)
    }catch(err){
        res.status(500).send(err)
    }
})


module.exports = router;
