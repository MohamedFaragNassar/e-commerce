import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getQuestions} from '../../Actions/QuestionsActions'
import Spinner from '../../components/Spinner'
import QuestionCard from '../QuestionCard'

const Questions = () => {
    const dispatch = useDispatch()
    const {loading,error,questions} = useSelector(state => state.getQuestions)
    
    useEffect(() => {
       dispatch(getQuestions())
    }, [])
    
    return <>
         <div className="showCart">
            <h3>Common Questions</h3>
            {questions&& questions.map(q => 
                <QuestionCard q={q.question} a={q.answer} size="card-small" />
            )} 
            {loading ? <Spinner /> :null}
            {error ? <div>Smothing went wrong</div> : null}
        </div>
    </>
}

export default Questions
