import Axios from 'axios'
import {ADD_QUESTION_FAIL,ADD_QUESTION_REQUEST,ADD_QUESTION_SUCCESS,GET_QUESTIONS_FAIL
        ,GET_QUESTIONS_REQUEST,GET_QUESTIONS_SUCCESS,ADD_QUESTION} from '../Constants/QuestionsConstants'


const getQuestions = () => async(dispatch,) => {
    dispatch({type:GET_QUESTIONS_REQUEST})
    try{
        const {data} = await Axios.get(`/api/questions`)
        dispatch({type:GET_QUESTIONS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_QUESTIONS_FAIL,payload:err})
    }
}
const addQuestion = (question) => async(dispatch,getState) => {
    dispatch({type:ADD_QUESTION_REQUEST})
    try{
        const {userSignIn:{userData}} =getState()
        const {data} = await Axios.post(`/api/questions`,question,{
          headers:{
          Authorization: `Bearer ${userData.token}`,
          }
        })
    
        dispatch({type:ADD_QUESTION_SUCCESS,payload:data})
        dispatch({type:ADD_QUESTION,payload:data})
    }catch(err){
        dispatch({type:ADD_QUESTION_FAIL,payload:err})
    }
}

export {getQuestions,addQuestion}