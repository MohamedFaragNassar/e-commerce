import React, {useEffect,  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addWishlist,deleteWhishlist} from "../../Actions/wishlistActions"
import {addToCart} from "../../Actions/cartActions"
import {modifyDate} from '../../helpers/helpers'
import ProductReviews from "../ProductReviews"

const MobileDetails = ({product}) =>{
        const {userData} = useSelector(state => state.userSignIn)
        const [image, setImage] = useState("")
        const images = [...product?.images,product?.mainImage]
        
         
        const {wishlistProducts} = useSelector(state => state.wishlist)
      

        const dispatch = useDispatch()

        const addWishlistHandler = (product)=>{
            dispatch(addWishlist(product))
        }

        const handleDelete = (id)=>{
            dispatch(deleteWhishlist(id))
        }

        const addProductToCart = (product)=>{
            dispatch(addToCart(product))
        }
    
    
        const specs = product?.specifications
    
        let checkWhishlist 

        if( wishlistProducts && wishlistProducts.length > 0){
            checkWhishlist = wishlistProducts.find((wishlist) => wishlist._id.toString() === product._id.toString())
            
        }

       useEffect(() => {
           setImage("../"+product.mainImage)
        }, [])

      
  return <>
        <div className="header">{product.productName}</div>
        <div className="main-details">
            <div className="product-images">
                <div className="cover"><img className="cover-img" src={image} alt="product" /></div>
                <div className="other-images">
                    {images.map(img => (
                        <img key={img} onClick={()=> setImage("../"+img)} src={`../${img}`}/>
                    ))}
                </div>
            </div>
           <div className="specs">
               <ul>
               <div className="specs-header">
                   <span>Specifications </span>
                   <button onClick={ checkWhishlist ? ()=>handleDelete(product._id) :() => addWishlistHandler(product)} 
                   className="add-to-wishlist">
                   {userData ? checkWhishlist ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>:null}
                    </button>
               </div>
                   <li> <span>Brand : </span><div>{product.manufacturer}</div></li>
                   {product.category ==="mobile" || product.category ==="laptops" ?
                        <li> <span>CPU : </span><div>{product.cpu}</div></li>: null}
                   {product.category ==="laptops" ?<li> <span>GPU : </span><div>{product.gpu}</div></li>: null}
                   {product.category ==="mobile" || product.category ==="laptops" ?
                        <li> <span>RAM : </span><div>{product.ram} GB</div></li>: null}
                   {product.category ==="mobile" || product.category ==="laptops" ?
                        <li> <span>Display : </span><div>{product.display}</div></li>: null}
                    {product.category ==="mobile" || product.category ==="laptops" ?
                        <li> <span>Storage : </span><div>{product.storage} GB</div></li>: null}
                    {product.category!="mobile"&&product.category!="laptops" &&
                        specs.slice(0,4).map(e => 
                            <li key={e.value}> <span>{e.spec} : </span><div>{e.value}</div></li>
                        )
                    } 
               </ul>
               {product.onSale ? <div className="sale-details" >
                    <i className="far fa-badge-dollar"></i>
                    {`${product.sale.salePercentage} % Sale until ${modifyDate(new Date(product.sale.endDate))}`}
                     </div> :null}
               <div className="specs-btn-price">
                   <div >${ product.onSale? product.sale.salePrice : product.price}</div>
                   <button onClick={()=> addProductToCart(product)} ><i className="fas fa-cart-plus"></i>Add To Cart</button>
               </div>
               
           </div> 
        </div>
        
        
        <div className="product-specs">
            <div className="product-specs-header">Specifications</div>
            <div className="product-specs-body">
                <ul>
                    {product?.specifications.map(spec => (
                        <li key={spec.spec}>
                            <span>{`${spec.spec} : `}</span>
                            <span>{spec.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="product-discription">
        <div className="product-discr-header">Description</div>
            <div className="product-discr-body">
                {product.discription}
            </div>
        </div>
        <ProductReviews id={product._id} />
    </>
}


export default MobileDetails;