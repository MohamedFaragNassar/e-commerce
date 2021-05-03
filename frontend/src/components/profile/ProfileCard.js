import React from 'react'
import Status from '../Status'
import Spinner from '../Spinner'
import { updateImage } from '../../Actions/userAction'
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux"


const ProfileCard = ({userProfile}) => {

    const {imageLoading,imageError,image} = useSelector(state => state.updateImage)
    const {userData} = useSelector(state => state.userSignIn)
    const dispatch = useDispatch()
    const uploadHandler = async(e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image",file)

        try{
          const {data} = await Axios.post("/api/upload/",formData,{
            headers:{
              Authorization: `Bearer ${userData.token}`,
              }
          })
          
          if(data){
            dispatch(updateImage({
                image:data
            }))
          }
        }catch(err){
          console.log(err)
        }
    }
console.log(userProfile)
    return (
        <div className="user-details-body">
            <div className="user-img">
                <img src={`../${userProfile.userImage}`} />
                <input id="userImage" onChange={(e)=>uploadHandler(e)} type="file" name="userImage" />
                <label for="userImage" ><i class="far fa-camera"></i></label>
            </div>
            <div className="profile-name">
                {`${userProfile.firstName} ${userProfile.lastName}`}
            </div>
            <div className="user-data">
                <ul>
                    <li><i class="far fa-envelope"></i> <span>{userProfile.email}</span> </li>
                </ul>
            </div>
            {imageError? <Status isOpen="true" size="small" status="fail" message="Somthing went wrong, please try again" /> 
            : image=="success"? <Status isOpen="true" size="small" status="success" 
            message="Image uploaded successfully" />  : null}
            {imageLoading&&<Spinner/>}
    </div>
    )
}

export default ProfileCard
