import React, {useState} from "react"
import { useDispatch } from "react-redux";
import {addSale} from '../Actions/productActions'

const SaleModal = (props)=>{

    const id = props.id;
    const category = props.category;
    const [salePercentage,setSalePercentage] = useState()
    const [endDate,setEndDate] = useState()
    

    const dispatch = useDispatch()

    const addSaleHandler = ()=>{
        dispatch(addSale({
            id,
            category,
            salePercentage,
            endDate
        })) 
        const close = props.close
        close()
    }

    if(!props.isOpen){
        return null
    }
    return <>
        <div className="overlay"></div>
        <div className="modal sale-modal">
            <div className="modal-header">{props.header}</div>
            <div className="modal-body">
                <div>
                    <label>sale Percentage(%) :</label>
                    <input onChange={(e)=>setSalePercentage(e.target.value)} type="number" min={0} max={100} />
                </div>
                <div>
                    <label>end date :</label>
                    <input onChange={(e)=>setEndDate(e.target.value)} type="date" />
                </div>
            </div>
            <div className="modal-btn">
                <button onClick={()=>addSaleHandler()} className="confirm" >Confirm</button>
                <button onClick={props.close} className="cancel">Cancel</button>
            </div>
        </div>
    </>
}

export default SaleModal;