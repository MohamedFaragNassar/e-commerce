import Axios from "axios"
import{ADD_SHIPPING_REQUIST,ADD_SHIPPING_SUCCESS,ADD_SHIPPING_FAIL,GET_SHIPPING_SUCCESS,GET_SHIPPING_REQUIST,GET_SHIPPING_FAIL
,DELETE_SHIPPING_FAIL,DELETE_SHIPPING_REQUIST,DELETE_SHIPPING_SUCCESS,CLEAR_ADD_SHIPPING,
MAKE_SHIPPING_DEFAULT_FAIL,MAKE_SHIPPING_DEFAULT_REQUIST,MAKE_SHIPPING_DEFAULT_SUCCESS} from "../Constants/shippingConstants"



const getShipping = ()=> async(dispach,getState)=>{
   dispach({type:GET_SHIPPING_REQUIST})
   try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.get("/api/shipping/",{
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        }
    })
      console.log(data)
    dispach({type:GET_SHIPPING_SUCCESS,payload:data})

   }catch(error){
      dispach({type:GET_SHIPPING_FAIL,payload:error})
    }
}

const addShipping = (shippingInfo) => async(dispach,getState)=>{
  dispach({type:ADD_SHIPPING_REQUIST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.post("/api/shipping/",shippingInfo,{
        headers:{
          'Content-Type': 'application/json',
           Authorization: `Bearer ${userData.token}`,
        }
      })
      dispach({type:ADD_SHIPPING_SUCCESS,payload:data})
      setTimeout(()=>{
        dispach({type:CLEAR_ADD_SHIPPING})
      },5000)
    }catch(error){
      dispach({type:ADD_SHIPPING_FAIL,payload:error})
      setTimeout(()=>{
        dispach({type:CLEAR_ADD_SHIPPING})
      },5000)
    }
  }

  const deleteShipping = (shippingID) => async(dispach,getState)=>{
    dispach({type:DELETE_SHIPPING_REQUIST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.delete(`/api/shipping/${shippingID}`,{
        headers:{
          Authorization: `Bearer ${userData.token}`,
        }
      })
      dispach({type:DELETE_SHIPPING_SUCCESS,payload:data})

    }catch(error){
      dispach({type:DELETE_SHIPPING_FAIL,payload:error})
    }
  }

  const makeDefault = (shippingID) => async(dispach,getState)=>{
    dispach({type:MAKE_SHIPPING_DEFAULT_REQUIST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.put(`/api/shipping/${shippingID}`,{
        headers:{
          Authorization: `Bearer ${userData.token}`,
        }
      })
      dispach({type:MAKE_SHIPPING_DEFAULT_SUCCESS,payload:data})

    }catch(error){
      dispach({type:MAKE_SHIPPING_DEFAULT_FAIL,payload:error})
    }
  }


  export {addShipping,deleteShipping,getShipping,makeDefault}