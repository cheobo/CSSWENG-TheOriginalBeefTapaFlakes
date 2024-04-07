import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import './Navbar.css';
import logoMain from '../../Assets/logo_main.png';
import cartIcon from '../../Assets/cart_icon.png';
import searchIcon from '../../Assets/search.png';
import userIcon from '../../Assets/user.png';
import menuIcon from '../../Assets/menu.png';
import { CARTS_URL } from '../../API/constants';
import axiosInstance from '../../API/axiosInstance.js';

const Navbar = () => {
    const token = localStorage.getItem('jwt');
    const decodedToken = token ? decodeToken(token) : null;
    const isAdmin = decodedToken && decodedToken.isAdmin;

    const [cart, setCart] = useState();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axiosInstance.get(`${CARTS_URL}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setCart(response.data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        if (token) {
            fetchCartItems();
        }
    }, [token]);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            try {
                const response = await axiosInstance.get(`${CARTS_URL}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 200) {
                    const data = response.data;
                    setCartItemCount(data.cartItems.length);
                } else {
                    setCartItemCount(0);
                }
            } catch (error) {
                console.log('Error fetching cart item count:', error);
            }
        };

        if (token) {
            fetchCartItemCount();
        }
    }, [cart, token]);


    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logoMain} alt="" className='logo-img' />
            </div>
            <div className="nav-right">
                <ul className="nav-menu">
                    <li className="nav-item" onClick={() => redirectTo('/')}>Home</li>

                    <DropdownButton id="products" title="Products" openDropdown={openDropdown} onToggle={handleDropdownToggle}>
                        <DropdownMenu>
                            <button onClick={() => redirectTo('/products')}>Product List</button>
                            <button onClick={() => redirectTo('/search')}>Search Product</button>
                        </DropdownMenu>
                    </DropdownButton>
                    <DropdownButton id="partners" title="Partners" openDropdown={openDropdown} onToggle={handleDropdownToggle}>
                        <DropdownMenu>
                            <button onClick={() => redirectTo('/partners')}>Resellers</button>
                            <button onClick={() => redirectTo('/sponsors')}>Sponsors</button>
                        </DropdownMenu>
                    </DropdownButton>
                    <DropdownButton id="about" title="About" openDropdown={openDropdown} onToggle={handleDropdownToggle}>
                        <DropdownMenu>
                            <button onClick={() => redirectTo('/about')}>Contact Us</button>
                            <button onClick={() => redirectTo('/faq')}>Frequently Asked</button>
                            <button onClick={() => redirectTo('/terms')}>Terms of Service</button>
                            <button onClick={() => redirectTo('/refund')}>Refund Policy</button>
                        </DropdownMenu>
                    </DropdownButton>

                    {decodedToken && decodedToken.isAdmin && <li className="nav-item" onClick={() => redirectTo('/admin-dashboard')}>Admin Dashboard</li>}
                </ul>

                <div className="nav-login-cart">
                    <img src={cartIcon} alt="Cart" className='cart-img' onClick={() => redirectTo('/cart')} />
                    <div className="nav-cart-count">{cartItemCount}</div>
                    <img src={searchIcon} alt="Search" className='search-img' />
                    <DropdownButton id="user" title={<img src={userIcon} alt="User" className='user-img'/>} openDropdown={openDropdown} onToggle={handleDropdownToggle}>
                        <DropdownMenuIcon>
                            {token ? <button onClick={handleLogout}>Logout</button> : (
                                <>
                                    <button onClick={() => redirectTo('/login')}>Login</button>
                                    <button onClick={() => redirectTo('/register')}>Register</button>
                                </>
                            )}
                        </DropdownMenuIcon>
                    </DropdownButton>
                    <img src={menuIcon} alt="Menu" className='menu-img' onClick={() => redirectTo('/COS')} />
                </div>
            </div>
        </div>
    )
};

const redirectTo = (route) => {
    window.location.href = route;
};

const DropdownButton = ({ id, title, children, openDropdown, onToggle }) => {
    const isOpen = openDropdown === id;

    return (
        <li className="dropdown-button" onClick={() => onToggle(id)}>
            {typeof title === "string" ? <span>{title}</span> : title}
            {isOpen && children}
        </li>
    );
};

const DropdownMenu = ({ children }) => (
    <div className="dropdown-menu">
        {children}
    </div>
);

const DropdownMenuIcon = ({ children }) => (
    <div className="dropdown-menu-icon">
        {children}
    </div>
);

const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users/logout', { method: 'POST' });

        if (response.status === 200) {
            localStorage.removeItem('jwt');
            redirectTo("/login");
        }
    } catch (error) {
        console.log('Logout error: ', error);
    }
};

export default Navbar;