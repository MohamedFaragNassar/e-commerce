import React, {useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShowProduct from "../components/ShowProduct"
import {getProductCategory} from "../Actions/productActions"
import Spinner from "../components/Spinner"
import Status from "../components/Status"

const MobileScreen = (props)=>{
    
    const dispatch = useDispatch()

    const {loading, error, products} = useSelector(state => state.productsCategory)
    console.log(products)
    useEffect(() => {
        const category = props.match.params.category;
        dispatch(getProductCategory(category))
    }, [props])

    return <>
        { loading ? <Spinner /> : error ? <Status isOpen = {true} status="fail" size="big"
                                message="Ops... Somthing went wrong, please try again" />: products?.length > 0 ?
            <div className="show-products">
                {products.map(prod => 
                     <ShowProduct product={prod} />
                )}
        </div> : <div style={{width:100+"%",textAlign:"center"}}>No Products in this category yet</div>}
    
    </>
}

export default MobileScreen;