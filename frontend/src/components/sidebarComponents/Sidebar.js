import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import SideNave from "./SideNave"
import {useClickToClose} from "../../helpers/CTC"
import { RenderComponent } from "../../Actions/sidebarActions";


const Sidebar = ()=>{
    const {SideComp} = useSelector(state => state.sidebarComponent);
    const dispatch = useDispatch()

    const sidebar = useRef()
    const node = useClickToClose(()=>dispatch(RenderComponent("")),"#sidebar-comp")
    
  
    return <>
            <div ref={sidebar} className="sidebar-container">
                <SideNave  />
            { SideComp ? <div ref={node} id="sidebar-comp" className="sidebar-comp">  {SideComp} </div> : <div></div>}   
            </div>
    </>

}
export default Sidebar