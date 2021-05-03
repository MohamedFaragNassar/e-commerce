import React from 'react'
import { Link } from 'react-router-dom';
import Review from '../components/Review'
const ProductHighlight = (props) => {
    const product = props.product;
    if(!product){
        return null
    }
    return (
        <div className="product-highlight">
          <div className="heilight-info">
                <Link to={`/product/${product._id}`} >{product.productName}</Link>
                <div className="highlight-prices">
                    {product.onSale? <span >${product.price}</span>:null}
                    <div className="product-price" >${ product.onSale? product.sale.salePrice : product.price}</div>
                </div>
                <Review value = {product.rating} color="#2D6187" size={20} />
          </div>
          <img src={product.mainImage} />
        </div>
    )
}

export default ProductHighlight
