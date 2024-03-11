import React, { useState, useEffect } from 'react';
import './ProductPage.css';

import { PRODUCT_URL } from '../../API/constants';
import axiosInstance from '../../API/axiosInstance.js';

const Product = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [product, setProduct] = useState();
    const [selectedPackage, setSelectedPackage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [warningMessage, setWarningMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const handleFetchProduct = async () => {
            try {
                const productId = window.location.pathname.split('/').pop();
                const response = await axiosInstance.get(`${PRODUCT_URL}/${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status !== 200) {
                    throw new Error(response.data.error || 'Failed to fetch product');
                }

                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error.message);
            }
        };

        handleFetchProduct();
    }, []);

    // Function to update the selected package
    const handlePackageSelection = (productpackage) => {
        setSelectedPackage((prevPackage) => (prevPackage === productpackage ? '' : productpackage));
        setShowWarning(false);
    };

    // Function to dynamically update price based on package
    const getPrice = (price) => {
        const numericPrice = parseFloat(price.$numberDecimal);
        return numericPrice.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
    };

    // Function that displays an error message if the user hasn't selected a package
    const handleAddToCart = () => {
        if (!selectedPackage) {
            setWarningMessage('Please select a package');
            setShowWarning(true);
        } else {
            // Proceed with add to cart functionality
            setShowWarning(false);
            console.log('Product added to cart:', { selectedPackage, quantity });
            // Add to cart logic here
        }
    };

    return (
        <div className="product-container">
            {product && (
                <div className="p-details-container">
                    <div className="p-image-gallery">
                        <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
                    </div>
                    <div className="product-details">
                        <h1>{product.name}</h1>
                        <p className="p-amount">{product.totalBottles}</p>
                        <p className="p-price">
                            {selectedPackage ? getPrice(product.packages.find((pkg) => pkg.packageOption === selectedPackage).price) : 'Select a package'}
                        </p>
                        <div>
                            {product.packages.map((productpackage, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePackageSelection(productpackage.packageOption)}
                                    className={
                                        selectedPackage === productpackage.packageOption
                                            ? 'p-package-button selected'
                                            : 'p-package-button'
                                    }
                                >
                                    {productpackage.packageOption}
                                </button>
                            ))}
                        </div>
                        <ul>
                            {product.packages
                                .filter((pckg) => pckg.packageOption === selectedPackage)
                                .flatMap((pckg) =>
                                    pckg.bottlesPerFlavor.map((flavor, index) => (
                                        <li key={index}>
                                            {flavor.flavor}: {flavor.quantity}
                                        </li>
                                    ))
                                )}
                        </ul>
                        <h3>
                            Product Description:
                        </h3>
                        <p className="p-product-description" style={{ whiteSpace: 'pre-line' }}>
                            {product.description}
                        </p>
                        <div className="p-quantity-selector">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        {showWarning && <div className="p-error-bubble">{warningMessage}</div>}
                        <ul>
                            <li>Ingredients: {product.ingredients}</li>
                            <li>Nutritional Info: {product.nutriInfo}</li>
                        </ul>
                        <button className="p-add-to-cart" onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
