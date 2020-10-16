import React, {useEffect,  useState } from "react"

const MobileDetails = ({product}) =>{
        
        const [image, setImage] = useState("")
        const [specs, setSpecs] = useState([])
        const images = ["../1602513837764-photo1.png","../1602520184369-people-2587807_1920.jpg","../1602520238988-3800880.jpg"]
       useEffect(() => {
           setImage("../"+product.mainImage)
           if(product.specifications){
               setSpecs(product.specifications.split(","))
           }
           
           return () => {
               //
           }
       }, [product])
       
  return <>
        <div className="header">{product.productName}</div>
        <div className="main-details">
            <div className="product-images">
                <div className="cover"><img className="cover-img" src={image} alt="product" /></div>
                <div className="other-images">
                    {images.map(img => (
                        <img onClick={()=> setImage(img)} src={img}/>
                    ))}
                </div>
            </div>
           <div className="specs">
               <div className="specs-header">Specifications </div>
               <ul>
                   <li> <span>Company : </span><div>{product.manufacturer}</div></li>
                   <li> <span>CPU : </span><div>{product.cpu}</div></li>
                   <li><span>RAM : </span><div>{product.ram}</div></li>
                   <li><span>Display : </span><div>{product.display}</div></li>
                   <li><span>Storage : </span><div>{product.storage}</div></li>
               </ul>
               <div className="specs-btn-price">
                   <div className="product-prc">Price : ${product.price}</div>
                   <div><button className="add-to-cart">Add To Cart</button></div>
               </div>
               
           </div> 
        </div>
        
        
        <div className="product-specs">
            <div className="product-specs-header">Specifications</div>
            <div className="product-specs-body">
                <ul>
                    {specs.map(spec => (
                        <li>{spec}</li>
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
    </>
}


export default MobileDetails;