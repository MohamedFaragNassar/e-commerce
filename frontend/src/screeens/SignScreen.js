import React from 'react'
import {Route } from 'react-router-dom'
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'

const SignScreen = () => {
   
    return (
        <div className="register" >
            <section className="img-container" >
                <img src="../img.jpg" alt="welcome page" />
            </section>
            <Route path="/register" component={RegisterScreen}  />
            <Route path="/signin"   component={LoginScreen}     />
            
        </div>
    )
    
}

export default SignScreen
