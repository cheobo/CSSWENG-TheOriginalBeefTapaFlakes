import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import f1_img from '../../Assets/fprod1.JPG';
import f2_img from '../../Assets/fprod2.JPG';
import f3_img from '../../Assets/fprod3.JPG';

const ProductList = () => {
  	return (
    	<div className="productlist-container">
    		<hr />
      		<h1>PRODUCT LIST</h1>
      		<div className="productlist-imgs">
        		<div className="productlist-image-container">
        			<Link to="/product1">
        	    		<img src={f1_img} alt="The Original Beef Tapa Flakes" className="productlist-image" />
    				</Link>
          			<Link to="/product1" className="product-title">
            			<h3>The Original Beef Tapa Flakes (330 Grams)</h3>
          			</Link>
          			<p><strong>P215 - P335</strong></p>
        		</div>
        		<div className="productlist-image-container">
          			<Link to="/product2">
            			<img src={f2_img} alt="Trial Pack All 3 Flavors" className="productlist-image" />
          			</Link>
          			<Link to="/product2" className="product-title">
            			<h3>Trial Pack All 3 Flavors (330 Grams)</h3>
          			</Link>
          			<p><strong>P625</strong></p>
        		</div>
        		<div className="productlist-image-container">
          			<Link to="/product3">
            			<img src={f3_img} alt="Negosyo Package" className="productlist-image" />
          			</Link>
          			<Link to="/product3" className="product-title">
            			<h3>Negosyo Package 1 Box 24 Bottles Assorted Flavors</h3>
          			</Link>
          			<p><strong>P4,450</strong></p>
        		</div>
      		</div>
      		<hr className="hr-bottom" />
    	</div>
  	);
};

export default ProductList;
