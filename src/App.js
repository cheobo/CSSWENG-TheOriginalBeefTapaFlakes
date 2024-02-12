import './App';
import Navbar from './Components/Navbar/Navbar.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Views/Home.jsx';
import Products from './Components/Views/Products.jsx';
import Partners from './Components/Views/Partners.jsx';
import About from './Components/Views/About.jsx';
import Cart from './Components/Views/Cart.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products category="list"/>}/>
        <Route path='/' element={<Products category="search"/>}/>
        <Route path='/partners' element={<Partners category="resellers"/>}/>
        <Route path='/' element={<Partners category="sponsors"/>}/>
        <Route path='/about' element={<About category="contact"/>}/>
        <Route path='/' element={<About category="faq"/>}/>
        <Route path='/' element={<About category="terms"/>}/>
        <Route path='/' element={<About category="refund"/>}/>

        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
