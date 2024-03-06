import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import f1_img from '../../Assets/fprod1.JPG';
import f2_img from '../../Assets/fprod2.JPG';

const ProductList = () => {
  	return (
    	<div className="productlist-container">
    		<hr />
      		<h1>PRODUCT LIST</h1>
      		<div className="productlist-imgs">
        		<div className="productlist-image-container">
        			<Link to="/product1">
        	    		<img src={f1_img} alt="Sub-Reseller Package" className="productlist-image" />
    				</Link>
          			<Link to="/product1" className="product-title">
            			<h3>Sub-Reseller Package</h3>
          			</Link>
          			<p><strong>P1,975 - P3,075</strong></p>
        		</div>
        		<div className="productlist-image-container">
          			<Link to="/product2">
            			<img src={f2_img} alt="Reseller Package" className="productlist-image" />
          			</Link>
          			<Link to="/product2" className="product-title">
            			<h3>Reseller Package</h3>
          			</Link>
          			<p><strong>P3,950 - P6,150</strong></p>
        		</div>
      		</div>
      		<hr className="hr-bottom" />
    	</div>
  	);
};

export default ProductList;
