import React from 'react'
import { useSelector } from 'react-redux'
import ShowProduct from '../components/ShowProduct'
import Spinner from '../components/Spinner'
import Status from '../components/Status'
const FilteredProducts = () => {
    const {loading,error,filter} = useSelector(state => state.filterProducts)  
    
    if(filter &&filter.length < 1){
        return  <Status isOpen={true} status="fail" size="big"
        message="No products match this filter"  />
    }
    return <>
       {loading? <Spinner/> : error? <Status isOpen={true} status="fail" size="big"
         message="Ops... sothing went wrong, please try again"  /> : filter ? <div className="show-products">
                {filter.map(prod => 
                     <ShowProduct product={prod} />
                )}
            </div> :null}
    </>
}

export default FilteredProducts
