import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getUserDetails,updateImage} from "../Actions/userAction"
import{getShipping} from "../Actions/shippingActions"
import Shipping from "../components/Shipping"
import Spinner from "../components/Spinner"
import Status from "../components/Status"
import Axios from "axios";
import MyOrders from '../screeens/MyOrders'
import EditProfile from '../components/profile/EditProfile'
import AddShipping from '../components/AddShipping'
import {useClickToClose} from '../helpers/CTC'

const UserDetails = () =>{

   const dispatch = useDispatch() 
   
   const {shippingInfo} = useSelector(state => state.shipping)
   const {loading,error,userProfile} =  useSelector(state => state.userDetails)
   const {imageLoading,imageError,image} = useSelector(state => state.updateImage)
   const {userData} = useSelector(state => state.userSignIn)
   const [imageTemp,setImage] = useState("")
   const [isOpen,setIsOpen] = useState(false)
    const [isShippingOpen,setIsShippingOpen] = useState(false)
   
  useEffect(() => {
       dispatch(getUserDetails())
       dispatch(getShipping())
    }, [imageTemp])

    
    const uploadHandler = async(e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image",file)

        try{
          const {data} = await Axios.post("/upload/",formData,{
            headers:{
              Authorization: `Bearer ${userData.token}`,
              }
          })
          
          if(data){
            setImage(data)
          }
        }catch(err){
          console.log(err)
        }
    }

    const updateImageHandler = ()=>{
            dispatch(updateImage({
                image:imageTemp
            }))
            setImage("temp")
    }

    const editProfileNode = useClickToClose(()=>setIsOpen(false),"#editprofilr")
    const addShippingNode = useClickToClose(()=>setIsShippingOpen(false),"#addshipping")
  
    
  if(! userProfile){
      if(error){
          return <Status isOpen="true" status="fail" size="big" message="Somthing went wrong, please try again" />
      }else if(loading){
          return <Spinner />
      }
  }else{
      return<>
      <div className="profile" >
        <div className="profile-data">
            <div className="user-details">
                <div className="user-details-header">
                    <h1>{userProfile.userName}</h1>
                    <button onClick={()=>setIsOpen(true)} >Edit Profile</button>
                </div>
                <div className="user-details-body">
                    <div className="user-img">
                        <img src={`../${userProfile.userImage}`} />
                        <input onChange={(e)=>uploadHandler(e)} type="file" name="userImage" />
                        {imageLoading?<Spinner/>:<button onClick={()=>updateImageHandler()} className="clear-wishlist">Update Image</button>}
                    </div>
                    <div className="user-data">
                        <ul>
                            <li><i class="far fa-envelope"></i> <span>{userProfile.email}</span> </li>
                        </ul>
                    </div>
                    {imageError? <Status isOpen="true" size="small" status="fail" message="Somthing went wrong, please try again" /> 
                    : image=="success"? <Status isOpen="true" size="small" status="success" 
                    message="Image uploaded successfully" />  : null}
                </div>
            </div>
                <div className="shippinginfo">
                    <Shipping shippingInfo={shippingInfo} openAddShipping={()=>setIsShippingOpen(true)}/>
                </div>
            </div>  

        <MyOrders />
        </div> 
        {isOpen&&<EditProfile node={editProfileNode} />}
        {isShippingOpen&&<AddShipping  node={addShippingNode} />}
      </>
  }
    

}

export default UserDetails;