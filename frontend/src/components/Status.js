import React from 'react'

const Status = (props) => {
    return <>
        <div className={`${props.status} ${props.size}`}>
            <div className={`status-${props.status}`}>{props.status==="success"? <i className="fas fa-check-circle"></i> 
                                : <i className="fas fa-times-circle"></i> }</div>
            <div className="status-message">{props.message}</div>
        </div>
    </>
    
}

export default Status;
