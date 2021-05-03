import React from 'react'
import { Link, Route } from 'react-router-dom'
import Orders from '../components/profile/Orders'
import Password from '../components/profile/Password'
import ProfileMain from '../components/profile/ProfileMain'
import EditProfile from '../components/profile/EditProfile'
const Profile = () => {
    
    return <>
        <div className="profile-page">
            <div className="profile-nav">
                <Link to="/profile">Profile</Link>
                <Link to="/profile/edit">Edit Profile</Link>
                <Link to="/profile/orders">Orders</Link>
                <Link to="/profile/password">Password</Link>
            </div>
            <div className="profile-body">
                <Route path="/profile" exact={true} component={ProfileMain} />
                <Route path="/profile/edit" component={EditProfile} />
                <Route path="/profile/orders" component={Orders} />
                <Route path="/profile/password" component={Password} />
            </div>
        </div>
    </>
}

export default Profile
