import Axios from "axios"
import{ADD_SHIPPING_REQUIST,ADD_SHIPPING_SUCCESS,ADD_SHIPPING_FAIL,GET_SHIPPING_SUCCESS,GET_SHIPPING_REQUIST,GET_SHIPPING_FAIL
,DELETE_SHIPPING_FAIL,DELETE_SHIPPING_REQUIST,DELETE_SHIPPING_SUCCESS,CLEAR_ADD_SHIPPING,ADD_SHIPPING,
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
    dispach({type:GET_SHIPPING_SUCCESS,payload:data})
  }catch(error){
      dispach({type:GET_SHIPPING_FAIL,payload:error})
  }
}

const addShipping = ( name,country,city, address,postalcode) => async(dispach,getState)=>{
  dispach({type:ADD_SHIPPING_REQUIST})
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.post("/api/shipping/",{name,country,city,address,postalcode},{
        headers:{
          'Content-Type': 'application/json',
           Authorization: `Bearer ${userData.token}`,
        }
      })
      dispach({type:ADD_SHIPPING_SUCCESS,payload:data})
      dispach({type:ADD_SHIPPING,payload:data})
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
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.delete(`/api/shipping/${shippingID}`,{
        headers:{
          Authorization: `Bearer ${userData.token}`,
        }
      })
      dispach({type:DELETE_SHIPPING_SUCCESS,payload:shippingID})

    }catch(error){
      console.log(error)
    }
  }

  const makeDefault = (id) => async(dispach,getState)=>{
    try{
      const {userSignIn:{userData}} =getState()
      const {data} = await Axios.put(`/api/shipping/`,{id},{
        headers:{
          Authorization: `Bearer ${userData.token}`,
        }
      })
      dispach({type:MAKE_SHIPPING_DEFAULT_SUCCESS,payload:id})

    }catch(error){
      console.log(error)
    }
  }


  export {addShipping,deleteShipping,getShipping,makeDefault}