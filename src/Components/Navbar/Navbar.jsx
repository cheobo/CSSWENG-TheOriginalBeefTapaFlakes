import React from 'react'
import './Navbar.css'
import logoMain from '../../Assets/logo_main.png';
import cartIcon from '../../Assets/cart_icon.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo">
          <img src={logoMain} alt="" className='logo-img' />
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
          <img src={cartIcon} alt="" className='cart-img' />
      </div>
    </div>
    
  )
}

export default Navbar