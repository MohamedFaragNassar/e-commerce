import {ADD_QUESTION_FAIL,ADD_QUESTION_REQUEST,ADD_QUESTION_SUCCESS,GET_QUESTIONS_FAIL
    ,GET_QUESTIONS_REQUEST,GET_QUESTIONS_SUCCESS,ADD_QUESTION} from '../Constants/QuestionsConstants'

const getQuestionsReducer = (state={},action)=>{
    switch(action.type){
        case GET_QUESTIONS_REQUEST :
            return {...state,loading:true}   
        case GET_QUESTIONS_SUCCESS : 
            return {loading:false, questions:action.payload}     
        case GET_QUESTIONS_FAIL :
            return {loading:false, error:action.payload}
        case ADD_QUESTION :
            return {questions:[...state.questions,action.payload]}   
        default:
            return state;    
    }
}

const addQuestionReducer = (state={},action)=>{
    switch(action.type){
        case ADD_QUESTION_REQUEST :
            return {...state,loading:true}   
        case ADD_QUESTION_SUCCESS : 
            return {loading:false, newQuestion:action.payload}     
        case ADD_QUESTION_FAIL :
            return {loading:false, error:action.payload}   
        default:
            return state;    
    }
}

export {getQuestionsReducer,addQuestionReducer}