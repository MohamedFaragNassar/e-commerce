import React from 'react'
import Status from '../../components/Status'
import Spinner from '../../components/Spinner'
import Modal from "../../components/Modal"
import SaleModal from "../../components/saleModale"
import {getAllProducts,deleteProduct,deleteSale} from "../../Actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useState } from 'react'
import {deleteUser} from '../../Actions/userAction'
import {RenderComponent} from '../../Actions/sidebarActions'
import AddProductModal from '../../components/AddProductModal'
import EditProductModal from '../../components/EditProductModal'
import {useClickToClose} from '../../helpers/CTC'

const ManageProducts = () => {
    
    const {products}= useSelector(state => state.allProducts)
       
    const {saleLoading,saleError,sale}  = useSelector(state => state.addSale)
    const {delSaleLoading,delSaleError,delSale}  = useSelector(state => state.deleteSale)
    
    const [isOpen,setIsopen] = useState(false)
    const [isAddProductOpen,setIsAddProductOpen] = useState(false)
    const [isUpdateProduct,setIsUpdateProduct] = useState(false)
    const [isSaleOpen,setIsSaleOpen] = useState(false)
    const [header,setHeader] = useState("")
    const [message,setMessage] = useState("")
    const [handler,setHandler] = useState()
    const [id,setId] = useState()
    const [prod_id,setProdID] = useState()
    const [category,setCategory] = useState()

    const node = useClickToClose(()=>setIsAddProductOpen(false),".add-product-modal")
    const domeNode = useClickToClose(()=>setIsUpdateProduct(false),"#editproductmodal")

    const dispatch = useDispatch()
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

 useEffect(() => {
     
    dispatch(RenderComponent("")) 
    dispatch(getAllProducts())

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
   setMessage(`Are you sure you want to delete this ${delType} ?!  once you confirm you can not revert the deletion`)
   setHandler(delType)
   setIsopen(true)
}

const handleEditModal = (id) => {
    setProdID(id)
    setIsUpdateProduct(true)
}




return <>
<div className="manage-products">
    <div className="manage-products-header"><span>Manage Products</span>
    <button onClick={()=>setIsAddProductOpen(true)} to="/add/mobile">Add New Product</button></div>
    <div className="manage-products-body">
        <div className="manage-products-item"><span className="productName">Name : </span><span>Amount : </span>
            <span>Price : </span><span>Sale : </span><span></span><span></span></div>
        {products?.map(product=>
            <div key={product._id} className="manage-products-item">
                <span className="productName">{product.productName}</span>
                <span>{product.amount}</span>
                <span>${ product.onSale? product.sale.salePrice
                    + `  ( ${product.sale.salePercentage}% sale )` : product.price}</span>
                <span>{product.onSale ? 
                            <button className="cancel-sale" onClick={()=>handleDeleteSaleModel(product._id,product.category)}>
                                Cancel sale
                            </button >
                            : <button className="cancel-sale" onClick={()=>handleSaleModel(product._id,product.category,product.price)}>
                                Make sale</button>}</span>
                <button className="edit-product" onClick={()=>handleEditModal(product._id)} >
                    <i class="fas fa-edit"></i>
                </button>
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

    
    <Modal isOpen={isOpen} close={()=>setIsopen(false)} header={header} message={message} 
            handler={handler === "Product" ? ()=>delProduct(id) : 
            handler === "User"? ()=>delUser(id): ()=>delSaleHandler(id,category) } />

    <SaleModal isOpen={isSaleOpen} close={()=>setIsSaleOpen(false)}
            header="making sale on the product"  
            id={id} category={category} />
    <AddProductModal isOpen={isAddProductOpen} close={()=>setIsAddProductOpen(false)} node={node} />
    {isUpdateProduct&&<EditProductModal node={domeNode}  id={prod_id} close={()=>setIsUpdateProduct(false)}   />}
</>
}

export default ManageProducts
