import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {AddProducts,updateProduct} from "../Actions/productActions"
import Spinner from "../components/Spinner"
import Status from "./Status"

const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId:"AKIA3AYBC6VU5HEK6O6R",
  secretAccessKey: "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"
});

const ProductForm = ({product,close})=>{

  const dispatch = useDispatch()
    
  const [pattern, setAddPattern] = useState(product?.category || "mobile")
  const [model,SetModel] = useState("mobile")

  const [productName,setProductName] = useState(product?.productName)
  const [manufacturer,setManufacturer] = useState(product?.manufacturer)
  const [amount,setAmount] = useState(product?.amount)
  const [price,setPrice] = useState(product?.price)
  const [cpu,setCpu] = useState(product?.cpu)
  const [gpu,setGpu] = useState(product?.gpu)
  const [storage,setStorage] = useState(product?.storage)
  const [display,setDisplay] = useState(product?.display)
  const [specifications,setSpecifications] = useState(product?.specifications)
  const [discription,setDiscription] = useState(product?.discription)
  const [ram,setRam] = useState(product?.ram)
  const [image,setImage] = useState(product?.image)
  const [images,setImages] = useState(product?.images)
  const [imageLoading,setImageLoading] = useState(false)
  const [imagesLoading,setImagesLoading] = useState(false)
  const [err,setErr] = useState()
  const [spec,setSpec] = useState()
  const [value,setValue] = useState()
    
  const {loading,error,addedProduct} = useSelector(state => state.addProduct)
  const {updateLoading,updateError,updatedProduct} = useSelector(state => state.updateProducts)

  const {userData} = useSelector(state => state.userSignIn)

/*     const uploadHandler = async(e)=>{
        setImageLoading(true)
        const file = e.target.files[0]
        const formData = new FormData()

        const params = {
          Bucket: 'mfnecommerce', // pass your bucket name
          Key: 'img1', // file will be saved as testBucket/contacts.csv
          Body: JSON.stringify(file, null, 2)
      };
      s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`)
      });
    } */

    
  function handleChoice(model){
    setAddPattern(model)
    SetModel(model)
  }

   const uploadHandler = async(e)=>{
        setImageLoading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image",file)

        try{
          const {data} = await Axios.post("/api/upload/",formData,{
            headers:{
              Authorization: `Bearer ${userData.token}`,
              }
          })
          
          if(data){
            setImage(data)
            setImageLoading(false)
          }
        }catch(err){
          console.log(err)
        }
    } 
    const uploadManyHandler = async(e)=>{
        setImagesLoading(true)
        const files = e.target.files
        const formData = new FormData()
        for(let i=0; i< files.length;i++){
          formData.append("images",files[i])
        }

        

        try{
          const {data} = await Axios.post("/api/upload/many",formData,{
            headers:{
              Authorization: `Bearer ${userData.token}`,
              }
          })
          if(data){
            setImages(data)
            setImagesLoading(false)
          }
        }catch(err){
          console.log(err)
        }
    }

    const handleAddSpec = () =>{
      if(spec && value){
        setSpecifications(specifications?[...specifications,{spec,value}]:[{spec,value}])
      }
      const inputs = document.querySelectorAll(".key-value")
      setSpec(null)
      setValue(null)
      inputs.forEach(e => 
        e.value = null 
      ) 
    }

    const handleDelSpec = (spec) => {
      setSpecifications(specifications.filter(e => e.spec != spec))
    }

    const handleAddProduct = (e)=>{
         e.preventDefault()
         dispatch(AddProducts({
          category:pattern, 
          productName,
          manufacturer,
          amount,
          price,
          cpu,
          gpu,
          storage,
          display,
          specifications,
          discription,
          ram,
          image,
          images: images?[...images]:null
        },pattern)) 
        
        const addForm = document.getElementById("add-form")
        addForm.reset()
        close()
      }

        

        const handleUpdateProduct = (e)=>{
          e.preventDefault()
          dispatch(updateProduct(pattern,product._id,{
              category:pattern, 
              productName,
              manufacturer,
              amount,
              price,
              cpu,
              gpu,
              storage,
              display,
              specifications,
              discription,
              ram,
             
          })) 

          const addForm = document.getElementById("add-form")
          addForm.reset()
          close()
        }


  return <>
  <form id="add-form" onSubmit={product ? (e)=>handleUpdateProduct(e):(e)=>handleAddProduct(e)}>
     {!product&&<div className="select-cat">
          <span>Category : </span>
          <select className="cat-options" name="category">
              <option onClickCapture={()=>handleChoice("mobile")} >mobile</option>
              <option onClickCapture={()=>handleChoice("laptops")}>laptops</option>
              <option onClickCapture={()=>handleChoice("pc hardware")}>pc hardware</option>
              <option onClickCapture={()=>handleChoice("home devices")}>Home devices</option>
              <option onClickCapture={()=>handleChoice("other")}>other</option>
          </select>
      </div>}
      <div className="add-pattern" >
        <div><span>Product Name : </span> <input type="text" name="productName" onChange={(e)=>setProductName(e.target.value)} required={true} defaultValue={product ? product.productName : null} /></div>
        <div><span>Manufacturer : </span> <input   type="text" name="manufacturer" onChange={(e)=>setManufacturer(e.target.value)} required={true} defaultValue={product ?product.manufacturer : null} /></div>
        <div><span>Amount : </span><input type="number" name="amount" required={true} onChange={(e)=>setAmount(e.target.value)} defaultValue={product ?product.amount : null}  /></div>
        <div><span>Price : </span><input  type="number" name="price" required={true} onChange={(e)=>setPrice(e.target.value)} defaultValue={product ?product.price : null} /></div>
        { pattern==="mobile" || pattern==="laptops" ? <div><span>CPU : </span><input  type="text" name="cpu" onChange={(e)=>setCpu(e.target.value)} required={true} defaultValue={product ?product.cpu : null} /></div>:null}
        { pattern==="laptops" ? <div><span>GPU : </span><input type="text" name="gpu" onChange={(e)=>setGpu(e.target.value)} required={true} defaultValue={product ?product.gpu: null} /></div>:null}
        { pattern==="mobile" || pattern==="laptops" ? <div><span>RAM : </span><input type="number" name="ram" onChange={(e)=>setRam(e.target.value)} required={true} defaultValue={product ?product.ram : null} /></div>:null}
        { pattern==="mobile" || pattern==="laptops" ? <div><span>Storage : </span><input type="number" name="storage" onChange={(e)=>setStorage(e.target.value)} required={true} defaultValue={product ?product.storage : null}  /></div>:null}
        { pattern==="mobile" || pattern==="laptops" ? <div><span>Display : </span><input type="text" name="display" onChange={(e)=>setDisplay(e.target.value)} required={true} defaultValue={product ?product.display : null} /></div>:null}
        {!product&&<div className="image-upload"><span>Cover Image :</span><input onChange={(e)=>uploadHandler(e)} type="file" name="mainImage" required={true}/></div>}
        {!product&&<div className="image-upload"><span>Images :</span><input onChange={(e)=>uploadManyHandler(e)} type="file" name="images" multiple required={true}/></div>}
        <div className="specifications">
          <span>Specifications : </span>
          <div className="spec-body">
              <div className="key-val">
                  <div>
                      <div>
                          <label>Spec : </label>
                          <input className="key-value" onChange={(e)=>setSpec(e.target.value)} type="text"  />
                      </div>
                      <div>
                          <label>Value : </label>
                          <input className="key-value" type="text" onChange={(e)=>setValue(e.target.value)} />
                      </div>
                  </div>
                  <span className="add-spec" onClick={()=>handleAddSpec()}><i className="fas fa-plus-square"></i></span>
              </div>
              <div className="showSpec">
                  {specifications?.map(e => 
                    <div>
                        <span>{`${e.spec} : `}</span>
                        <span className="val">{e.value}</span>
                        <span onClick={()=>handleDelSpec(e.spec)} style={{marginLeft:"auto",cursor:"pointer"}}>
                          <i className="fas fa-trash-alt"></i>
                        </span>
                    </div>  
                  )}
              </div>
          </div>
        </div>
        <div className="area"><span>Description : </span><textarea type="textArea" name="discription" onChange={(e)=>setDiscription(e.target.value)} required={true} defaultValue={product ? product.discription : null }/></div> 
      </div>  
      { imageLoading || imagesLoading ? <Spinner /> :
      <div className="add-btn-wrapper"><button type="submit" 
        className="add-btn">{ product ? "Update Product" : "Add Product"}</button></div>}
      {loading && <Spinner />}
      {error && <Status isOpen={true} status="fail" message={error.message} size="small" />}
      {addedProduct&&<Status isOpen={true} status="success" message="Product Added successfully" size="small" />}
      {updateLoading && <Spinner />}
      {updateError && <Status isOpen={true} status="fail" message={updateError.message} size="small" />}
    </form>
  </>  
    
}

export default ProductForm;