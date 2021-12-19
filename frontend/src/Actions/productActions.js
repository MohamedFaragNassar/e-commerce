import Axios from "axios"
import {LIST_PRODUCTS_FAIL,LIST_PRODUCTS_REQUEST,LIST_PRODUCTS_SUCCESS,ADD_PRODUCTS_FAIL,
    ADD_PRODUCTS_REQUEST,ADD_PRODUCTS_SUCCESS,DELETE_PRODUCTS,ADD_PRODUCT
    ,GET_PRODUCT_DETAILS_FAIL,GET_PRODUCT_DETAILS_REQUEST,GET_PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCTS_FAIL,UPDATE_PRODUCTS_REQUEST,UPDATE_PRODUCTS_SUCCESS,CLEAR_ADD_PRODUCT,
    LIST_CATEGORY_FAIL,LIST_CATEGORY_REQUEST,LIST_CATEGORY_SUCCESS,UPDATE_PRODUCT,
  GET_INFO_FAIL,GET_INFO_REQUEST,GET_INFO_SUCCESS,CLEAR_INFO,GET_FILTERED_PRODUCTS_FAIL
  ,GET_FILTERED_PRODUCTS_REQUEST,GET_FILTERED_PRODUCTS_SUCCESS,CLEAR_FILTER_PRODUCTS,
  ADD_COMMENT_FAIL,ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,CLEAR_ADD_COMMENT,
  ADD_SALE_FAIL,ADD_SALE_REQUEST,ADD_SALE_SUCCESS,CLEAR_ADD_SALE,ADD_COMMENT,
DELETE_SALE_SUCCESS,DELETE_SALE_REQUEST,DELETE_SALE_FAIL,CLEAR_DELETE_SALE,
GET_ALL_PRODUCTS_FAIL,GET_ALL_PRODUCTS_REQUEST,GET_ALL_PRODUCTS_SUCCESS,
GET_REVIEWS_FAIL,GET_REVIEWS_REQUEST,GET_REVIEWS_SUCCESS,CLEAR_REVIEWS,
DELETE_COMMENT_FAIL,DELETE_COMMENT_REQUEST,DELETE_COMMENT_SUCCESS, ADD_SALE, DELETE_SALE} from "../Constants/productConstants"




const getProducts = () => async(dispatch) => {
        dispatch({type:LIST_PRODUCTS_REQUEST})
        try{
            const {data} = await Axios.get("/api/main")
            dispatch({type:LIST_PRODUCTS_SUCCESS, payload:data})
          }catch(error){
          dispatch({type:LIST_PRODUCTS_FAIL,payload:error})
        }
        
}

const getAllProducts = () => async(dispatch) => {
        dispatch({type:GET_ALL_PRODUCTS_REQUEST})
        try{
            const {data} = await Axios.get("/api/allproducts")
            dispatch({type:GET_ALL_PRODUCTS_SUCCESS, payload:data})
          }catch(error){
          dispatch({type:GET_ALL_PRODUCTS_FAIL,payload:error})
        }
        
}

const AddProducts = (product,model) => async(dispatch,getState) => {
    dispatch({type:ADD_PRODUCTS_REQUEST})
    const {userSignIn:{userData}} =getState()
    try{
        const {data} = await Axios.post(`/api/add/${model}`,product,{
          headers:{
            Authorization: `Bearer ${userData.token}`,
            }
        })
        dispatch({type:ADD_PRODUCTS_SUCCESS, payload:"success"})
        if(data.product){
          dispatch({type:ADD_PRODUCT, payload:data.product})
        }
        setTimeout(()=>{
          dispatch({type:CLEAR_ADD_PRODUCT})
        },5000)
      }catch(error){
      dispatch({type:ADD_PRODUCTS_FAIL,payload:error})
      setTimeout(()=>{
        dispatch({type:CLEAR_ADD_PRODUCT})
      },5000)
    }
        
}

const deleteProduct = (id) => async(dispatch,getState)=>{
  try{
    const {userSignIn:{userData}} =getState()
    const {data} = await Axios.delete(`/api/delete/${id}`, {
      headers:{
      Authorization: `Bearer ${userData.token}`,
      }
    })

  dispatch({type:DELETE_PRODUCTS,payload:data})
  }catch(err){
    console.log(err)
  }
}

const getProductDetails = (id) => async(dispatch)=>{
  dispatch({type:GET_PRODUCT_DETAILS_REQUEST})
    try{
      const {data} = await Axios.get(`/api/product/${id}`)
      dispatch({type:GET_PRODUCT_DETAILS_SUCCESS,payload:data})
    }catch(error){
      dispatch({type:GET_PRODUCT_DETAILS_FAIL,payload:error})
    }
}

const getProductCategory = (category) => async(dispatch)=>{
  dispatch({type:LIST_CATEGORY_REQUEST})
    try{
      const {data} = await Axios.get(`/api/category/${category}`)
      dispatch({type:LIST_CATEGORY_SUCCESS,payload:data})
    }catch(error){
      dispatch({type:LIST_CATEGORY_FAIL,payload:error})
    }
}

const updateProduct = (model,id,product) => async(dispatch,getState)=>{
  dispatch({type:UPDATE_PRODUCTS_REQUEST})
  const {userSignIn:{userData}} =getState()
  try{
      const {data} = await Axios.put(`/api/edit/${model}/${id}`,product,{
        headers:{
          Authorization: `Bearer ${userData.token}`,
          }
      })
      dispatch({type:UPDATE_PRODUCTS_SUCCESS, payload:data})
      dispatch({type:UPDATE_PRODUCT,payload:data.product})
    }catch(error){
    dispatch({type:UPDATE_PRODUCTS_FAIL,payload:error})
  }
}

const getInfo = ()=>async(dispatch)=>{
  dispatch({type:GET_INFO_REQUEST})
  try{
    const {data} = await Axios.get("/api/info")
    dispatch({type:GET_INFO_SUCCESS,payload:data})
  }catch(error){
    dispatch({type:GET_INFO_FAIL,payload:error})
    setTimeout(()=>{
      dispatch({type:CLEAR_INFO})
    },5000)
  }
}

const filterProducts = (keywords) => async(dispatch)=>{
    dispatch({type:GET_FILTERED_PRODUCTS_REQUEST})
    try{
      const {data} = await Axios.post("/api/filter",keywords)
      dispatch({type:GET_FILTERED_PRODUCTS_SUCCESS,payload:data})
    }catch(error){
      dispatch({type:GET_FILTERED_PRODUCTS_FAIL,payload:error})
      setTimeout(()=>{
        dispatch({type:CLEAR_FILTER_PRODUCTS})
      },5000)
    }
}

const addReview = (review) => async(dispatch,getState)=>{
    dispatch({type:ADD_COMMENT_REQUEST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.post("/api/review",review,{
        headers:{
            Authorization: `Bearer ${userData.token}`,
          }
      })
      dispatch({type:ADD_COMMENT_SUCCESS,payload:data})
      dispatch({type:ADD_COMMENT,payload:{...data,user:{
        _id:userData.userID,
        firstName:userData.firstName,
        lastName:userData.lastName,
        image:userData.userImage
      }}})
      setTimeout(()=>{
        dispatch({type:CLEAR_ADD_COMMENT})
      },2000)
    }catch(error){
      if(error.message === "Request failed with status code 401") {
        dispatch({type:ADD_COMMENT_FAIL,payload:"You have already reviewed this product"})
      }else{
        dispatch({type:ADD_COMMENT_FAIL,payload:"Somthing went wrong, please try again"})
      }
      setTimeout(()=>{
        dispatch({type:CLEAR_ADD_COMMENT})
      },5000)
    }
}

const getProductReviews = (id) => async(dispatch) => {
  dispatch({type:GET_REVIEWS_REQUEST})
  try{
    const {data} = await Axios.get(`/api/review/${id}`)
    dispatch({type:GET_REVIEWS_SUCCESS,payload:data})
  }catch(error){
    dispatch({type:GET_REVIEWS_FAIL,payload:error})
    setTimeout(()=>{
      dispatch({type:CLEAR_REVIEWS})
    },5000)
  }
}

const addSale = (sale) => async(dispatch,getState)=>{
    dispatch({type:ADD_SALE_REQUEST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.patch("/api/sale",sale,{
        headers:{
            Authorization: `Bearer ${userData.token}`,
          }
      })
      dispatch({type:ADD_SALE_SUCCESS,payload:data})
      dispatch({type:ADD_SALE,payload:sale})
      setTimeout(()=>{
        dispatch({type:CLEAR_ADD_SALE})
      },2000)
    }catch(error){
      console.log(error.body)
      dispatch({type:ADD_SALE_FAIL,payload:error})
      setTimeout(()=>{
        dispatch({type:CLEAR_ADD_SALE})
      },5000)
    }
}

const deleteSale = (info) => async(dispatch,getState)=>{
    dispatch({type:DELETE_SALE_REQUEST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.patch("/api/sale/delete",info,{
        headers:{
            Authorization: `Bearer ${userData.token}`,
          }
      })
      dispatch({type:DELETE_SALE_SUCCESS,payload:data})
      dispatch({type:DELETE_SALE,payload:info})
      setTimeout(()=>{
        dispatch({type:CLEAR_DELETE_SALE})
      },2000)
    }catch(error){
      dispatch({type:DELETE_SALE_FAIL,payload:error})
      setTimeout(()=>{
        dispatch({type:CLEAR_DELETE_SALE})
      },5000)
    }
}

const deleteComment = (id) => async(dispatch,getState) => {
  dispatch({type:DELETE_COMMENT_REQUEST})
  try{
    const {userSignIn:{userData}} =getState()
    const {data} = await Axios.delete(`/api/review/${id}`,{
      headers:{
          Authorization: `Bearer ${userData.token}`,
        }
    })
    dispatch({type:DELETE_COMMENT_SUCCESS,payload:id})
  }catch(error){
    dispatch({type:DELETE_COMMENT_FAIL,payload:error})
  }
}

export {getProducts,deleteProduct,AddProducts,getProductDetails,getAllProducts,getProductReviews
        ,updateProduct,getProductCategory,getInfo,filterProducts,addReview,addSale,deleteSale,
        deleteComment};