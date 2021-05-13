import React from 'react'
import ProfileCard from './ProfileCard'
import DefaultAddress from './DefaultAddress'
import Addresses from './Addresses'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../Actions/userAction'
import { getShipping } from '../../Actions/shippingActions'

 const ProfileMain = () => {
    const {shippingInfo} = useSelector(state => state.shipping)
    const {userProfile} =  useSelector(state => state.userDetails)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserDetails())
        dispatch(getShipping())
     }, [])
    
    return <div className="profile-main">
        <div className="profile-main-top">
            <ProfileCard userProfile={userProfile} />
            {shippingInfo&&<DefaultAddress  location={shippingInfo?.find(e => e.isDefault)} />}
        </div>
        <Addresses address={shippingInfo} />
    </div>
}

export default ProfileMain
