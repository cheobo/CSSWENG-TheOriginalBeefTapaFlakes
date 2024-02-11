import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo-main.jpg'
import cart-icon from '../Assets/cart-icon.png'

const Navbar = () => {
  return (
    <div classsName='navbar'>
        <div className="nav-logo">
            <img src="logo-main" alt="" />
            <p>Adobo Flakes</p>
        </div>
        <ul className="nav-menu">
            <li>Home</li>
            <li>Products</li>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Partners</li>
        </ul>
        <div className="nav-login-cart">
            <button>Login</button>
            <img src="cart-icon" alt="" />
        </div>
    </div>
    
  )
}

export default Navbar