import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Views/Home/Home.jsx';
import Products from './Components/Views/ProductList_Views/ProductList_Views.jsx';
import ProductList from './Components/ProductList/ProductList.jsx'
import Partners from './Components/Views/Partners/Partners.jsx';
import About from './Components/Views/About/About.jsx';
import ProductPage from './Components/Views/Products/ProductPage_Views.jsx'
import Login from './Components/Views/Login/Login_Views.jsx';
import Register from './Components/Views/Register/Register_Views.jsx';
import ForgotPassword from './Components/Views/ForgotPassword_Views/ForgotPassword_Views.jsx';
import Cart from './Components/Views/Cart/Cart.jsx';

import AdminDashboard from './Components/Views/Admin/Admin.jsx';

function App() {
	return (
    	<div className="App">
      		<BrowserRouter>
      		<Navbar/>
      		<Routes>
      		<Route path='/' element={<Home />} />
				<Route path='/products/:productId' element={<ProductPage/>} />
          		<Route path='/products' element={<Products category="list" />} />
          		<Route path='/search' element={<Products category="search" />} />
          		<Route path='/partners/resellers' element={<Partners category="resellers" />} />
          		<Route path='/partners/sponsors' element={<Partners category="sponsors" />} />
          		<Route path='/about/contact' element={<About category="contact" />} />
          		<Route path='/about/faq' element={<About category="faq" />} />
          		<Route path='/about/terms' element={<About category="terms" />} />
          		<Route path='/about/refund' element={<About category="refund" />} />

					<Route path='/admin-dashboard' element={<AdminDashboard />} />

					<Route path='/cart' element={<Cart />} />
					<Route path='/productlist' element={<ProductList />} />

					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
