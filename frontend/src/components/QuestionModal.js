import React, {useState} from "react"
import { useDispatch } from "react-redux";
import {addQuestion} from '../Actions/QuestionsActions'
const QuestionsModal = ({isOpen,close})=>{

    const [question,setQuestion]= useState()
    const [answer,setAnswer]= useState()
    const dispatch = useDispatch()

    const handleAddQuestion = ()=>{
        dispatch(addQuestion({question,answer}))
        close()
    }
    if(!isOpen){
        return null
    }
    return <>
        <div className="overlay"></div>
        <div className="modal questions-modal">
            <div className="modal-header">Adding new question</div>
            <div className="questions-body">
                <div className="question">
                    <label>Question : </label>
                    <textarea placeholder="write the question here..." className="q-area"  onChange={(e)=>setQuestion(e.target.value)} />
                </div>
                <div className="question">
                    <label>Answer : </label>
                    <textarea placeholder="write the answer here..." className="q-area"  onChange={(e)=>setAnswer(e.target.value)} />
                </div>
            </div>
            <div className="modal-btn">
                <button onClick={()=>handleAddQuestion()} className="confirm" >Confirm</button>
                <button onClick={close} className="cancel">Cancel</button>
            </div>
        </div>
    </>
}

export default QuestionsModal;