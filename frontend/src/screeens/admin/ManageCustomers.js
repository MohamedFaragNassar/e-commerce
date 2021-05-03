import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers,deleteUser } from '../../Actions/userAction'
import Modal from "../../components/Modal"

const ManageCustomers = () => {
    const [isOpen,setIsOpen] = useState(false)
    const {users, loading,error}  = useSelector(state => state.usersList)
    const[id,setID] = useState()
    const dispatch = useDispatch()
    
    const delUser = () => {
        dispatch(deleteUser(id))
        setIsOpen(false)
    }
    const handleDelModel =  (id) =>{
       setID(id)
       setIsOpen(true)

    }
    useEffect(() => {
         dispatch(getUsers())
    }, [])
    
    
   
    return <>
        <div className="manage-products">
        <div className="manage-products-header"><span>Manage Users</span></div>
        <div className="manage-products-body">
            <div className="manage-customers-item"><span>Name : </span><span>Email : </span><span></span></div>
            {users?.filter(e => !e.isAdmin ).map(user=>
                <div key={user._id} className="manage-customers-item">
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                    <span>{user.email}</span>
                    <button onClick={()=>handleDelModel(user._id,"user")} className="delete-product">
                      <i class="fas fa-trash-alt"></i>
                    </button>   
                </div>
                )}
        </div>
        
    </div>
    <Modal isOpen={isOpen} close={()=>setIsOpen(false)} header="Deleting Customer" message="Are you sure you want to delete this customer?
                once you confirm you can not go back"
                handler={()=>delUser()} />

    </>
}

export default ManageCustomers
