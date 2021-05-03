import React, { useEffect, useState } from "react"
import Status from '../../components/Status'
import Spinner from '../../components/Spinner'
import { useDispatch, useSelector } from "react-redux"
import {getInfo,filterProducts} from '../../Actions/productActions'
import {useHistory} from 'react-router-dom'



const FilterModel = ({pattern})=>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {loading,error,info} = useSelector(state => state.filterInfo)

    const [manufacturer,setManufacturer] = useState()
    const [cpu,setCpu] = useState()
    const [gpu,setGpu] = useState()
    const [ram,setRam] = useState()
    const [storage,setStorage] = useState()

    useEffect(() => {
        if(!info){
            dispatch(getInfo())
        }
    }, [])

    const handleFilter = ()=>{
        dispatch(filterProducts({
            category:pattern?pattern:undefined,
            manufacturer,
            cpu,
            gpu,
            ram:ram?Number(ram):undefined,
            storage:storage?Number(storage):undefined
        }))

        history.push("/filter")
    }
  
    return <>
     {loading ? <Spinner /> : error ?<Status isOpen={true} size="small" status="fail"
                                     message="Somthing went wrong when fetching filter data" /> :  info? <>
        <div className="select-cat filter-select">
            <div>Brand : </div>
            <select name="manufacturer" className="cat-options filter-options" >
                    <option onClickCapture={()=>setManufacturer(undefined)} value={null}></option>
                {!pattern || pattern === "mobile" ? info.mobileBrands.map(item =>
                    <option onClickCapture={()=>setManufacturer(item)} >{item}</option>
                    ) :null }
                {!pattern || pattern === "laptops" ? info.laptopBrands.map(item =>
                    <option onClickCapture={()=>setManufacturer(item)} >{item}</option>
                    ) :null }
                {!pattern || pattern === "home devices"|| pattern === "pc hardware"|| pattern === "other" ? info.otherBrands.map(item =>
                    <option onClickCapture={()=>setManufacturer(item)} >{item}</option>
                    ) :null }
            </select>
        </div>
        {pattern ==="mobile"|| pattern==="laptops" ?<div className="select-cat filter-select">
            <div>CPU : </div>
            <select name="cpu" className="cat-options filter-options" >
                <option onClickCapture={()=>setCpu(undefined)} value={null}></option>
                {pattern === "mobile" ? info.mobileCpu.map(item =>
                    <option onClickCapture={()=>setCpu(item)} >{item}</option>
                    ) :null }
                {pattern === "laptops" ? info.laptopCpu.map(item =>
                    <option onClickCapture={()=>setCpu(item)} >{item}</option>
                    ) :null }
            </select>
        </div>:null}
        {pattern==="laptops" ?<div className="select-cat filter-select">
            <div>GPU : </div>
            <select name="gpu" className="cat-options filter-options" >
                <option onClickCapture={()=>setCpu(undefined)} value={null}></option>
                {info.laptopGpu.map(item => 
                    <option onClickCapture={()=>setGpu(item)} >{item}</option>
                    )}
            </select>
        </div>:null}
        {pattern ==="mobile"|| pattern==="laptops" ?<div className="select-cat filter-select">
            <div>RAM : </div>
            <select  name="ram" className="cat-options filter-options" >
                <option onClickCapture={()=>setRam(undefined)} value={null}></option>
                <option onClickCapture={()=>setRam("2")}  >2 GB</option>
                <option onClickCapture={()=>setRam("4")}  >4 GB</option>
                <option onClickCapture={()=>setRam("6")} >6 GB</option>
                <option onClickCapture={()=>setRam("8")}  >8 GB</option>
                <option onClickCapture={()=>setRam("12")} >12 GB</option>
                {pattern==="laptops" ?<option onClickCapture={()=>setRam("16")} >16 GB</option>:null}
                {pattern==="laptops" ?<option onClickCapture={()=>setRam("32")} >32 GB</option>:null}
                {pattern==="laptops" ?<option onClickCapture={()=>setRam("64")} >64 GB</option>:null}
            </select>
        </div>:null}
        {pattern ==="mobile"|| pattern==="laptops" ?<div className="select-cat filter-select">
            <div>Storage : </div>
            <select name="storage" className="cat-options filter-options" >
                <option onClickCapture={()=>setStorage(undefined)}  value={null}></option>
                {pattern==="mobile" ?<option onClickCapture={()=>setStorage("8")}  >8 GB</option>:null}
                {pattern==="mobile" ?<option onClickCapture={()=>setStorage("16")} >16 GB</option>:null}
                {pattern==="mobile" ?<option onClickCapture={()=>setStorage("32")}>32 GB</option>:null}
                {pattern==="mobile" ?<option onClickCapture={()=>setStorage("64")} >64 GB</option>:null}
                {pattern==="mobile" ?<option onClickCapture={()=>setStorage("128")}>128 GB</option>:null}
                <option onClickCapture={()=>setStorage("256")}>256 GB</option>
                <option onClickCapture={()=>setStorage("512")}>512 GB</option>
                {pattern==="laptops" ?<option onClickCapture={()=>setStorage("1024")}>1 TB</option>:null}
                {pattern==="laptops" ?<option onClickCapture={()=>setStorage("2048")}>2 TB</option>:null}
            </select>
        </div>:null}
     </> :null }
     <button onClick={()=>handleFilter()}  className="clear-wishlist">Filter</button>
     
    </> 
}

export default FilterModel;