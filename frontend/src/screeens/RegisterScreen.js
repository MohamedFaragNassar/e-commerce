import React from "react"


const RegisterScreen = (props)=>{

    return <>
    <div className="register add-product ">
        <form action="/users/register" method="POST">
            <div>
                <label htmlFor="userName">Name : </label>
                <input type="text" name="userName"/>
            </div>
            <div>
                <label htmlFor="email">Email : </label>
                <input type="email" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password : </label>
                <input type="password" name="password"/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" name="confirmPassword"/>
            </div>
            <div><button type="submit" >Sign UP</button></div>    
            
        </form>
    </div>    
    </>
}
export default RegisterScreen;