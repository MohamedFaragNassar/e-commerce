import Axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useClickToClose} from '../components/ClickToClose'

const Search = () => {
    const search = useRef()
    const history = useHistory()
    const [result,setResult] = useState([])
    const searchRes = document.querySelector(".search-result")
    
    
    const debounce = (func, wait, immediate)=> {
        let timeout;
      
        return function executedFunction() {
          const context = this;
          const args = arguments;
              
          const later =()=> {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
      
          const callNow = immediate && !timeout;
          
          clearTimeout(timeout);
      
          timeout = setTimeout(later, wait);
          
          if (callNow) func.apply(context, args);
        };
      };
    const clearSearch = ()=>{
        const searchRes = document.querySelector(".search-result")
        searchRes.classList.add("hide-search")
    }


    const domNode = useClickToClose(clearSearch,search)

    
      const searchResult = debounce(async(keword)=>{
          if(searchRes){
            searchRes.classList.remove("hide-search")
            }
         const {data} = await Axios.get(`/api/search?keyword=${keword}`)
         setResult(data)
      },200)

      const handleClick = (id)=>{
        history.push(`/product/${id}`)
        if(searchRes){
          searchRes.classList.add("hide-search")
          }
      }
    
    return <>

            <form ref={search} className = "search-form">
                <input className="search-input" onKeyUp={(e)=>searchResult(e.target.value)} type="text" 
                placeholder="Search for products" ></input>
                <span className="search-btn" ><i className="fas fa-search"></i></span>
                {result.length>=1?<div ref={domNode} className="search-result">
                    {result.map(item => 
                    <div onClick={()=>handleClick(item._id)} >
                        <span>{item.productName}</span><span> from {item.manufacturer}</span>
                    </div>
                      )}
                </div>:null}
            </form> 
   </>
}

export default Search
