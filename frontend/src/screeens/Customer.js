import React from 'react';
import {Route,Link } from 'react-router-dom';
import Main from "../screeens/MainScreen"
import AddProduct from '../screeens/AddProduct';
import ProductDetails from '../screeens/ProductDetails';
import MobileScreen from '../screeens/MobileScreen';
import UpdateProduct from "../screeens/UpdateProduct";
import SignScreen from "./SignScreen";
import { useSelector} from 'react-redux';
import SignedUser from "../components/signedUser"
import UnSignedUser from "../components/unSignedUser"
import Sidebar from "../components/sidebarComponents/Sidebar"
import UserDetails from "../screeens/UserDetails"
import ProtectedRoute from "../components/ProtectedRoute"
import EditProfile from "../screeens/EditProfile"
import OrederScreen from "../screeens/OrderScreen"
import Preview from "../screeens/PreviewOrder"
import Profile from "../screeens/Profile"
import MyOrders from "../screeens/MyOrders"
import OrderDetails from "../screeens/OrderDetails"
import FilteredProducts from '../screeens/FilteredProducts'
import MainMenu from '../components/MainMenu'
import { useState } from 'react';
import {useClickToClose} from '../helpers/CTC'
import ShowCart from '../components/sidebarComponents/ShowCart';
import Wishlist from '../components/sidebarComponents/Wishlist';
import { useEffect } from 'react';

const Customer = (props) => {
    
    const userSignIn = useSelector(state => state.userSignIn);
    const {userData} = userSignIn
    const [isOpen,setIsOpen] = useState(false)
    const node = useClickToClose(()=>setIsOpen(false),"#mainmenu")
   

    const checkSideBar = () => {
        const width = window.screen.width > 800
        const page = window.location.pathname =="/" || window.location.pathname.includes("product") 
                || window.location.pathname.includes("filter")|| window.location.pathname.includes("category")
        
        
        return width && page    
    }

    useEffect(()=>{
      
    },[props,isOpen])

    return <>
        <header>
            <div className="container">

                <div className="navigation">
                    <div className="nav-1">
                        <div className="logo">
                            <button onClick={()=>setIsOpen(true)} className="hide menu-btn"><i className="fas fa-bars"></i></button>
                            <Link className="name" to="/">Electronices Shop</Link>
                            {isOpen&&<MainMenu node={node}/>}
                        </div>

                        <div className="main-menu">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li className="cat" ><span to="/categories">Categories</span>
                                    <div className="items-container" >
                                        <ul className="cat-items" >
                                            <li><Link className="cat-item" to="/category/mobile">Mobiles</Link></li>
                                            <li><Link className="cat-item" to="/category/laptops">Laptops</Link></li>
                                            <li><Link className="cat-item" to="/category/homedevices">Home Devices</Link></li>
                                            <li><Link className="cat-item" to="/category/pc">Pc Hardware</Link></li>
                                            <li><Link className="cat-item" to="/category/other">Other</Link></li>
                                        </ul>
                                    </div>    
                                </li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                     <div className="user">
                            {userData ? <SignedUser/> : <UnSignedUser/>}
                    </div>
                </div>
                

            </div>
        </header>
        <div className="container">
                <div className="mid-container">

                    <div className="sidebar">
                        <Route path="/" exact={true} component={Sidebar}/>    
                        <Route path="/filter"        component={Sidebar}/>    
                        <Route path="/product/:id"   component={Sidebar}/>    
                        <Route path="/category/"     component={Sidebar}/>    
                     </div>

                     {/* style={checkSideBar()?{marginLeft:80+'px'}:null} */}
                    <div className="main" style={checkSideBar()?{marginLeft:80+'px'}:null} >
                        <ProtectedRoute path="/add/:model"  component={AddProduct}/>
                        <Route path="/orders"               component={OrederScreen}/>
                        <Route path="/filter"               component={FilteredProducts}/>
                        <Route path="/order/:id"            component={OrderDetails}/>
                        <Route path="/myorders"             component={MyOrders}/>
                        <Route path="/preview"              component={Preview}/>
                        <Route path="/register"             component={SignScreen}/>
                        <Route path="/signin"               component={SignScreen}/>
                        <Route path="/users/edit/"          component={EditProfile} />
                        <Route path="/users/" exact         component={UserDetails}/>
                        <Route path="/profile/"             component={Profile}/>
                        <ProtectedRoute path="/edit/:id"    component={UpdateProduct}/>
                        <Route path="/category/:category"   component={MobileScreen}/>
                        <Route path="/product/:id"          component={ProductDetails}/>
                        <Route path="/mycart" component={ShowCart} />
                        <Route path="/mywishlist" component={Wishlist} />
                        <Route path="/" exact={true}        component={Main}/>
                    </div>
                                    
                </div>
            
            <footer>
                <div className='footer-cat'>
                    <div>Categories</div>
                    <ul>
                        <li><Link to="/category/mobile" >Mobiles</Link></li>
                        <li><Link to="/category/laptops">Laptos</Link></li>
                        <li><Link to="/category/pc">Pc Hardware</Link></li>
                        <li><Link to="/category/other">Home Devices</Link></li>
                        <li><Link to="">Other</Link></li>
                    </ul>
                </div>
                <div className='footer-social'>
                    <div>follow Us</div>
                    <ul>
                        <li><Link to="/">Facebook</Link></li>
                        <li><Link to="/">twitter</Link></li>
                        <li><Link to="/">instgram</Link></li>
                        <li><Link to="/">pinterest</Link></li>
                        <li><Link to="/">linked in</Link></li>
                    </ul>
                </div>
                <div className='footer-links'>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/terms">Terms</Link></li>
                    </ul>
                </div>
            </footer>

        </div>
     
    </>
}

export default Customer
