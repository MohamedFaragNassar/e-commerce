import React from 'react'
import {Link} from 'react-router-dom'

const AdminMenu = () => {
    return <>
        <div className="admin-menu">
            <div>
                <i className="fas fa-store" style={{marginRight:10+"px",fontSize:15+"px"}}></i>
                <Link to="/admin/" className="admin-menu-link">Products</Link>
            </div>
            <div>
                <i class="fas fa-bags-shopping" style={{marginRight:10+"px",fontSize:15+"px"}}></i>
                <Link  className="admin-menu-link" to="/admin/orders">Orders</Link>
            </div>
            <div>
                <i className="fas fa-users" style={{marginRight:10+"px",fontSize:15+"px"}}></i>   
                <Link to="/admin/customers" className="admin-menu-link">Customers</Link>
            </div>
            <div>
                <i class="fas fa-comments" style={{marginRight:10+"px",fontSize:15+"px"}}></i>
                <Link to="/admin/questions" className="admin-menu-link">{"Q&A"}</Link>
            </div>
        </div>
    </>
}

export default AdminMenu
