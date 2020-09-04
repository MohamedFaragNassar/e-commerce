import React from 'react'

const AddProduct = (props)=>{


    return (
        <>
            <div className='add-product'>
                <form action = "/products/add" method = "POST">
                    <div><span>Product Name : </span> <input type="text" name="productName" /></div>
                    <div><span>Manufacturer : </span> <input type="text" name="manufacturer" /></div>
                    <div>
                        <span>Category : </span>
                        <select className="cat-options" name="category">
                            <option>mobile</option>
                            <option>laptops</option>
                            <option>pc hardware</option>
                            <option>Home deviced</option>
                            <option>other</option>
                        </select>
                    </div>
                    <div><span>Amount : </span><input type="text" name="amount" /></div>
                    <div><span>Price : </span><input type="text" name="price" /></div>
                    <div><span>Specifications : </span><textarea type="textArea" name="specifications" /></div>
                    <div><button className="add-btn">Add Product</button></div>
                    
                </form>
            </div>
        </>
    )
}

export default AddProduct;