import React from 'react'
import { Link } from 'react-router-dom'

const GhuestScreen = () => {

    return (
        <div className="ghuest">
            <h3>Project Manger</h3>
            <p>The power to make project management simple</p>
            <div className="ghuest-links" >
                <Link className="join-now" to="/signup">Join Now</Link>
                <Link to="/signin">Already have Account? sign in</Link>
            </div>
            <div  className="pre-made">
                <img src="account.png" />
                <span>Pre-Made Account</span>
            </div>
        </div>
    )
}

export default GhuestScreen
