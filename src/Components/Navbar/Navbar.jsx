import React from 'react';
import './Navbar.css';
import logoMain from '../../Assets/logo_main.png';
import cartIcon from '../../Assets/cart_icon.png';
import menuIcon from '../../Assets/menu.png';
import searchIcon from '../../Assets/search.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logoMain} alt="" className='logo-img' />
      </div>
      <ul className="nav-menu">
        <li className="nav-item" onClick={() => redirectTo('/')}>Home</li>

        <DropdownButton title="Products">
          <DropdownMenu>
            <button className="dropdown-item" onClick={() => redirectTo('/products')}>Product List</button>
            <button className="dropdown-item" onClick={() => redirectTo('/search')}>Search Product</button>
          </DropdownMenu>
        </DropdownButton>
        <DropdownButton title="Partners">
          <DropdownMenu>
            <button className="dropdown-item" onClick={() => redirectTo('/partners')}>Resellers</button>
            <button className="dropdown-item" onClick={() => redirectTo('/sponsors')}>Sponsors</button>
          </DropdownMenu>
        </DropdownButton>
        <DropdownButton title="About">
          <DropdownMenu>
            <button className="dropdown-item" onClick={() => redirectTo('/about')}>Contact Us</button>
            <button className="dropdown-item" onClick={() => redirectTo('/faq')}>Frequently Asked</button>
            <button className="dropdown-item" onClick={() => redirectTo('/terms')}>Terms of Service</button>
            <button className="dropdown-item" onClick={() => redirectTo('/refund')}>Refund Policy</button>
          </DropdownMenu>
        </DropdownButton>
      </ul>

      <div className="nav-login-cart">
        <img src={cartIcon} alt="" className='cart-img' onClick={() => redirectTo('/cart')}/>
        <div className="nav-cart-count">1</div>
        <img src={searchIcon} alt="" className='search-img' />
        <img src={menuIcon} alt="" className='menu-img' />
      </div>
    </div>
  )
}

const redirectTo = (route) => {
  window.location.href = route;
};

const DropdownButton = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="dropdown-button" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      {title}
      {isOpen && children}
    </li>
  );
};

const DropdownMenu = ({ children }) => (
  <div className="dropdown-menu">
    {children}
  </div>
);

export default Navbar;
