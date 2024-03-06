import React, { useState, useEffect } from 'react';
import './Product1.css';
import image from '../../Assets/fprod1.JPG';

const Product1 = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Initialize quantity state to 1
    const [quantity, setQuantity] = useState(1);

    const [selectedPackage, setSelectedPackage] = useState('');

    const [warningMessage, setWarningMessage] = useState('');

    const [showWarning, setShowWarning] = useState(false);
  
    // Update state when input changes
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Function to handle package selection
    const handlePackageSelection = (productpackage) => {
        setSelectedPackage(currentPackage => currentPackage === productpackage ? '' : productpackage);
        setShowWarning(false);
    };

    // Function to dynamically update price based on package
    const getPrice = () => {
        switch (selectedPackage) {
            case 'Package A':
                return 'P1,975';
            case 'Package B':
                return 'P3,075';
            default:
                return 'P1,975 - P3,075';
        }
    };

    // Function that displays an error message if the user hasn't selected a package
    const handleAddToCart = () => {
        if (!selectedPackage) {
          setWarningMessage('Please select a package');
          setShowWarning(true);
        } else {
          // Proceed with add to cart functionality
          setShowWarning(false);
          console.log("Product added to cart:", { selectedPackage, quantity });
          // Add to cart logic here
        }
    };

    // Example review data
    const [reviews] = useState([
        { id: 1, user: 'John Doe', rating: 5, comment: 'Great product, highly recommend!' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Really good, but the size was slightly off.' },
        // Add more reviews as needed
    ]);
  
    return (
        <div className="product1-container">
            <div className="p1-details-container">
                <div className="p1-image-gallery">
                    <img src={image} alt="Sub-Reseller Package" />
                    {/* Add additional thumbnails or a carousel as needed */}
                </div>
                <div className="product1-details">
                    <h1>Sub-Reseller Package</h1>
                    <p className='p1-amount'>12 Bottles/Box</p>
                    <p className="p1-price">{getPrice()}</p>
                    <ul>
                        <li>Classic: 5 Bottles</li>
                        <li>Sisig: 5 Bottles</li>
                        <li>Spicy: 2 Bottles</li>
                    </ul>
                    <div className="p1-quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        min="1" 
                        value={quantity} // Set value to quantity state
                        onChange={handleQuantityChange} // Update state on change
                        />
                    </div>
                    <button
                        className="p1-add-to-cart"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                    {showWarning && (
                        <div className="p1-error-bubble">
                            {warningMessage}
                        </div>
                    )}
                    <div className="p1-package-selector">
                        {['Package A', 'Package B',].map((productpackage) => (
                            <button
                                key={productpackage}
                                onClick={() => handlePackageSelection(productpackage)}
                                className={selectedPackage === productpackage ? 'p1-package-button selected' : 'p1-package-button'}
                            >
                                {productpackage}
                            </button>
                        ))}
                    </div>
                    <ul>
                        <li>Ingredients: Beef, Salt, Pepper, Soy Sauce, Vinegar, Mixed Spices,
                            and Vegetable Oil.</li>
                        <li>Nutritional Info: Placeholder</li>
                    </ul>
                </div>
            </div>
            {/* Dynamic customer reviews section */}
            <div className="p1-reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.map((review) => (
                <div key={review.id} className="p1-review">
                    <h3>{review.user}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                </div>
                ))}
            </div>
      </div>
    );
};

export default Product1;
