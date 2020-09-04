import React from 'react';
import { Switch, Route,BrowserRouter,Router, Redirect, Link } from 'react-router-dom';
import Main from "./screeens/MainScreen"
import './App.css';
import AddProduct from './screeens/AddProduct';
import ProductDetails from './screeens/ProductDetails';

function App() {
  return (
    <BrowserRouter>
        
        <header>
            <div className="container">

                <div className="navigation">

                    <div className="logo">
                        <Link to="#"><img src="../../public/images/logo.png" alt="" /></Link>
                        <Link className="name" to="/">Electronices Shop</Link>
                    </div>

                    <div className="main-menu">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/categories">Categories</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="user">

                        <div className="nav-user">
                            <img src="./images/profile.jpg" alt=""/>
                            <button className="nav-user-details">v</button>
                        </div>
                        <div className="nav-user-menu">
                            <ul>
                                <li><a href="">view profile</a></li>
                                <li><a href="">Edit profile</a></li>
                                <li><a href="">My Cart</a></li>
                                <li><a href="">Log out</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                

            </div>
        </header>
        <div className="container">

            <div className="mid-container">
                <div className="main">

                    <Route path="/products/add" exact={true} component={AddProduct}/>
                    <Route path="/products/:id" component={ProductDetails}/>
                    <Route path="/products" exact={true} component={Main}/>

                </div>
                <div className="sidebar"></div>                
            </div>

            <footer></footer>

        </div>
     
    </BrowserRouter>
   
  );
}

export default App;
