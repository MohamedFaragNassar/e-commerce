import React from "react"

const Modal = (props)=>{
    
    if(!props.isOpen){
        return null
    }
    return <>
        <div className="overlay"></div>
        <div className="modal">
            <div className="modal-header">{props.header}</div>
            <div className="modal-body">{props.message}</div>
            <div className="modal-btn">
                <button onClick={props.handler} className="confirm" >Confirm</button>
                <button onClick={props.close} className="cancel">Cancel</button>
            </div>
        </div>
    </>
}

export default Modal;