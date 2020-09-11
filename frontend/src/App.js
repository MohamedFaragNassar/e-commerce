import React from 'react';
import { Switch, Route,BrowserRouter,Router, Redirect, Link } from 'react-router-dom';
import Main from "./screeens/MainScreen"
import './App.css';
import AddProduct from './screeens/AddProduct';
import ProductDetails from './screeens/ProductDetails';
import MobileScreen from './screeens/MobileScreen';
import PcScreen from './screeens/PcScreen';
import LaptopScreen from './screeens/LaptopScreen';
import HomeDevicesScreen from './screeens/HomeDevicesScreen';
import OtherScreen from './screeens/OtherScreen';
import SidebarFilter from './components/SidebarFilter';
import AdminDropdown from "./components/AdminDropdown";
import ManageScreen from "./screeens/ManageScreen";


function App() {

    function handleShowMenu(){
        const menu = document.querySelector(".nav-user-menu")
        menu.classList.toggle("show")
    }

  return (
    <BrowserRouter>
        
        <header>
            <div className="container">

                <div className="navigation">

                    <div className="logo">
                        <Link to="#"><img src="../../public/images/logo.png" alt="" /></Link>
                        <Link className="name" to="/main">Electronices Shop</Link>
                    </div>

                    <div className="main-menu">
                        <ul>
                            <li><Link to="/main">Home</Link></li>
                            <li className="cat" ><Link to="/categories">Categories</Link>
                                <div className="items-container" >
                                    <ul className="cat-items" >
                                        <li><Link to="/category/mobile">Mobiles</Link></li>
                                        <li><Link to="/category/laptops">Laptops</Link></li>
                                        <li><Link to="/category/homedevices">Home Devices</Link></li>
                                        <li><Link to="/category/pc">Pc Hardware</Link></li>
                                        <li><Link to="/category/other">Other</Link></li>
                                    </ul>
                                </div>    
                            </li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    

                    <div className="user">

                        <div className="nav-user">
                            <img src="./images/profile.jpg" alt=""/>
                            <button onClick={()=>{handleShowMenu()}} className="nav-user-details">v</button>
                        </div>
                        <div className="nav-user-menu">
                            <AdminDropdown/>
                        </div>
                        
                    </div>
                </div>
                

            </div>
        </header>
        <div className="container">

            <div className="mid-container">
                <div className="main">

                    <Route path="/add/:model" component={AddProduct}/>
                    <Route path="/manage" exact={true} component={ManageScreen}/>
                    <Route path="/category/mobile" exact={true} component={MobileScreen}/>
                    <Route path="/category/laptops" exact={true} component={LaptopScreen}/>
                    <Route path="/category/homedevices" exact={true} component={HomeDevicesScreen}/>
                    <Route path="/category/pc" exact={true} component={PcScreen}/>
                    <Route path="/category/other" exact={true} component={OtherScreen}/>
                    <Route path="/product/:id" component={ProductDetails}/>
                    <Route path="/main" exact={true} component={Main}/>

                </div>
                <div className="sidebar">
                    <Route path="/main" component={SidebarFilter}/>    
                </div>                
            </div>

            <footer>
                <div className='footer-cat'>
                    <div>Categories</div>
                    <ul>
                        <li><Link>Mobiles</Link></li>
                        <li><Link>Laptos</Link></li>
                        <li><Link>Pc Hardware</Link></li>
                        <li><Link>Home Devices</Link></li>
                        <li><Link>Other</Link></li>
                    </ul>
                </div>
                <div className='footer-social'>
                    <div>follow Us</div>
                    <ul>
                        <li><Link>Facebook</Link></li>
                        <li><Link>twitter</Link></li>
                        <li><Link>instgram</Link></li>
                        <li><Link>pinterest</Link></li>
                        <li><Link>linked in</Link></li>
                    </ul>
                </div>
                <div className='footer-links'>
                    <ul>
                        <li><Link>About</Link></li>
                        <li><Link>Contact</Link></li>
                        <li><Link>Terms</Link></li>
                    </ul>
                </div>
            </footer>

        </div>
     
    </BrowserRouter>
   
  );
}

export default App;
