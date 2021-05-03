import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {getUsers,deleteUser} from "../Actions/userAction"
import {getAllProducts,deleteProduct,deleteSale} from "../Actions/productActions"
import {getAllOrders} from "../Actions/orderActions"
import ManageOrders from '../components/ManageOrders'
import Modal from "../components/Modal"
import SaleModal from "../components/saleModale"
import Status from '../components/Status'
import Spinner from '../components/Spinner'


const ManageScreen =  (props)=>{

    
    
    const usersList = useSelector(state => state.usersList)
    const {users} = usersList
    const listProducts = useSelector(state => state.allProducts)
    const {products} = listProducts
    const {saleLoading,saleError,sale}  = useSelector(state => state.addSale)
    const {delSaleLoading,delSaleError,delSale}  = useSelector(state => state.deleteSale)
    const {ordersLoading,ordersError,orders} = useSelector(state => state.allOrders)
    console.log(products)

    const dispatch = useDispatch()  
    
   const [isOpen,setIsopen] = useState(false)
   const [isSaleOpen,setIsSaleOpen] = useState(false)
   const [header,setHeader] = useState("")
   const [message,setMessage] = useState("")
   const [handler,setHandler] = useState()
   const [id,setId] = useState()
   const [category,setCategory] = useState()
   

    useEffect(() => {

        dispatch(getUsers())
        dispatch(getAllProducts())
        dispatch(getAllOrders())
        
    }, [])
    
    
   
   const delProduct = (id) => {
        dispatch(deleteProduct(id))
        setIsopen(false)
    }
   
   const delUser = (id) => {
        dispatch(deleteUser(id))
        setIsopen(false)
    }

    const delSaleHandler = (id,category)=>{
        dispatch(deleteSale({
            id,
            category,
        }))
        setIsopen(false)
    }

   const handleDelModel =  (id,type) =>{
       const delType = type==="product" ? "Product" : "User"
       setId(id)
       setHeader(`Deleting ${delType}`)
       setMessage(`Are you sure you want to delete this ${delType} ?! /N once you confirm you can not revert the deletion`)
       setHandler(delType)
       setIsopen(true)
   }

   const handleSaleModel = (id,category) =>{
       setId(id)
       setCategory(category)
       setIsSaleOpen(true)
    }

    const handleDeleteSaleModel = (id,category)=>{
        setId(id)
        setCategory(category)
        setHeader("Deleting Sale")
        setMessage("Aru sure you want to cancel the sale on this product, once you confirm you can not revert the change")
        setHandler("sale")
        setIsopen(true)
    }
   
    
    return <>
    
    <div className="manage-products">
        <div className="manage-products-header"><span>Manage Products</span>
        <Link to="/add/mobile">Add New Product</Link></div>
        <div className="manage-products-body">
            <div className="manage-products-item"><span>Name : </span><span>Amount : </span>
                <span>Price : </span><span>Sale : </span></div>
            {products.map(product=>
                <div key={product._id} className="manage-products-item">
                    <span>{product.productName}</span>
                    <span>{product.amount}</span>
                    <span>${ product.onSale? product.sale.salePrice
                     + `  ( ${product.sale.salePercentage}% sale )` : product.price}</span>
                    <span>{product.onSale ? 
                                <button className="cancel-sale" onClick={()=>handleDeleteSaleModel(product._id,product.category)}>
                                    Cancel sale
                                </button >
                             : <button className="cancel-sale" onClick={()=>handleSaleModel(product._id,product.category,product.price)}>
                                 Make sale</button>}</span>
                    <Link className="edit-product" to={`/edit/${product._id}`} >
                        <i class="fas fa-edit"></i>
                    </Link>
                    <button onClick={()=>handleDelModel(product._id,"product")} 
                        className="delete-product"><i class="fas fa-trash-alt"></i></button>   
                </div>
                )}
        </div>
    </div>    

    {saleLoading ? <Spinner/>  : saleError ?
     <Status isOpen="true" status="fail" 
         message="Somthing went wrong, please try again"  size="big"/> :
     sale === "success" ? <Status isOpen="true" status="success" 
        message="added sale to the product successfully"  size="big" />:null }
    {delSaleLoading ? <Spinner/>  : delSaleError ?
     <Status isOpen="true" status="fail" 
         message="Somthing went wrong, please try again"  size="big"/> :
     delSale === "success" ? <Status isOpen="true" status="success" 
        message="deleted the sale successfully"  size="big" />:null }

    
    <ManageOrders additionalField="user" loading={ordersLoading} error={ordersError} orders={orders} />

    <div className="manage-products">
        <div className="manage-products-header"><span>Manage Users</span></div>
        <div className="manage-products-body">
            <div className="manage-products-item"><span>Name : </span><span>Email : </span></div>
            {users.filter(e => !e.isAdmin ).map(user=>
                <div key={user._id} className="manage-products-item">
                    <span>{user.userName}</span>
                    <span>{user.email}</span>
                    <button onClick={()=>handleDelModel(user._id,"user")} className="delete-product">
                      <i class="fas fa-trash-alt"></i>
                    </button>   
                </div>
                )}
        </div>
        
    </div>

            <Modal isOpen={isOpen} close={()=>setIsopen(false)} header={header} message={message} 
                handler={handler === "Product" ? ()=>delProduct(id) : 
                handler === "User"? ()=>delUser(id): ()=>delSaleHandler(id,category) } />

            <SaleModal isOpen={isSaleOpen} close={()=>setIsSaleOpen(false)}
             header="making sale on the product"  
             id={id} category={category} />
                
    </>
    

}
export default ManageScreen;