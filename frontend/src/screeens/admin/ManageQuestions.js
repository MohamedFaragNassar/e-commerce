import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import QuestionModal from '../../components/QuestionModal'
import {getQuestions} from '../../Actions/QuestionsActions'
import QuestionCard from '../../components/QuestionCard'

const ManageQuestions = () => {
    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const {questions} = useSelector(state => state.getQuestions)

    useEffect(() => {
       dispatch(getQuestions())
    }, [dispatch])

    return <>
        <div className="manage-products">
            <div className="manage-products-header"><span>Manage Questions</span></div>
            <div className="manage-products-body">
                <div className="anqc">
                    <button onClick={()=>setIsOpen(true)} className="add-new-question">Add New Question</button>
                </div>
                <div className="show-questions">
                    {questions?.map(question => 
                        <QuestionCard q={question.question} a={question.answer} size="card-big" />    
                    )}
                </div>
            </div> 
        </div>
        <QuestionModal isOpen={isOpen} close={()=>setIsOpen(false)} />
    </>
}

export default ManageQuestions
