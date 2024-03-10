import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import f1_img from '../../Assets/fprod1.JPG';
import f2_img from '../../Assets/fprod2.JPG';
import { PRODUCT_URL } from '../../API/constants';
import axiosInstance from '../../API/axiosInstance.js';

const ProductList = () => {
	// State to store the products fetched from the database
	const [products, setProducts] = useState([]);
	
	const calculateMinMax = (arr) => {
		if (arr.length === 0) return null;
	
		// Convert Decimal128 values to numbers
		const numericArr = arr.map(obj => parseFloat(obj.$numberDecimal));
	
		// Filter out NaN values and ensure array has at least one numeric value
		const filteredArr = numericArr.filter(price => !isNaN(price));
		if (filteredArr.length === 0) return null;
	
		const min = Math.min(...filteredArr).toLocaleString();
		const max = Math.max(...filteredArr).toLocaleString();
	
		return ` P${min} - P${max}`;
	};

	useEffect(() => {
	   // Function to fetch products from the database
	   const fetchProducts = async () => {
		try {
		    // Make a GET request to fetch products from the database
		    const response = await axiosInstance.get(PRODUCT_URL); 
		    // Set the products state with the fetched data
		    setProducts(response.data);
		} catch (error) {
		    console.error('Error fetching products:', error);
		}
	};
	   // Call the fetchProducts function when the component mounts
	   fetchProducts();
	}, []); // Empty dependency array to only run the effect once when the component mounts

  	return (
    	<div className="productlist-container">
    		<hr />
      		<h1>PRODUCT LIST</h1>
      		<div className="productlist-imgs">
				{/* Map over the products array and render each product */}
				{products.map(product => (
          			<div key={product._id} className="productlist-image-container">
            			<Link to={`/products/${product._id}`}>
            			  <img src={product.image} alt={product.name} className="productlist-image" />
           				</Link>
          				<Link to={`/products/${product._id}`} className="product-title">
              				<h3>{product.name}</h3>
            			</Link>
            			<p><strong>Price Range:{calculateMinMax(product.price)}</strong></p>
          			</div>
        		))}
      		</div>
      		<hr className="hr-bottom" />
    	</div>
  	);
};

export default ProductList;
