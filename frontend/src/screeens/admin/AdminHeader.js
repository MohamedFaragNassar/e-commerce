import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../Actions/userAction'
import {Link} from 'react-router-dom'
const AdminHeader = () => {
    const dispatch = useDispatch()
    
    const handleLogout = () =>{
        dispatch(logout())
        window.location.href = "/"
    }
    return <div className="admin-header">
        <Link to="/admin">Electronices Shop</Link>
        <button onClick={()=>handleLogout()}>Logout</button>
    </div>
}

export default AdminHeader
