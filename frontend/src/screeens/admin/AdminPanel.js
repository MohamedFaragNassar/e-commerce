import React from 'react'
import {Link,Route} from 'react-router-dom'
import AdminMenu from './AdminMenu'
import ManageOrders from '../../components/ManageOrders'
import AdminHeader from './AdminHeader'
import ManageProducts from './ManageProducts'
import ManageCustomers from './ManageCustomers'
import ManageQuestions from './ManageQuestions'


const AdminPanel = () => {
    return <>
        <div className="admin">
            <AdminHeader/>
            <AdminMenu/>    
            <div className="admin-body">
                 <Route path="/admin/orders" component={ManageOrders} />       
                 <Route path="/admin/customers" component={ManageCustomers} />       
                 <Route path="/admin/questions" component={ManageQuestions} />       
                 <Route path="/admin/" exact component={ManageProducts} />        
            </div>
        </div>
       
    </>
}

export default AdminPanel
