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

    const [selectedFlavor, setSelectedFlavor] = useState('');

    const [selectedSize, setSelectedSize] = useState('');

    const [warningMessage, setWarningMessage] = useState('');

    const [showWarning, setShowWarning] = useState(false);
  
    // Update state when input changes
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Function to handle flavor selection
    const handleFlavorSelection = (flavor) => {
        setSelectedFlavor(currentFlavor => currentFlavor === flavor ? '' : flavor);
        setShowWarning(false);
    };

    // Function to update the selected size
    const handleSizeSelection = (size) => {
        setSelectedSize(currentSize => currentSize === size ? '' : size);
        setShowWarning(false);
    };

    // Function to dynamically update price based on size
    const getPrice = () => {
        switch (selectedSize) {
            case '330 Grams':
                return 'P215';
            case '510 Grams':
                return 'P335';
            default:
                return 'P215 - P335';
        }
    };

    // Function that displays an error message if the user hasn't selected a flavor or size or both
    const handleAddToCart = () => {
        if (!selectedFlavor && !selectedSize) {
          setWarningMessage('Please select a flavor and size');
          setShowWarning(true);
        } else if (!selectedFlavor) {
          setWarningMessage('Please select a flavor');
          setShowWarning(true);
        } else if (!selectedSize) {
          setWarningMessage('Please select a size');
          setShowWarning(true);
        } else {
          // Proceed with add to cart functionality
          setShowWarning(false);
          console.log("Product added to cart:", { selectedFlavor, selectedSize, quantity });
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
                    <img src={image} alt="The Original Beef Tapa Flakes" />
                    {/* Add additional thumbnails or a carousel as needed */}
                </div>
                <div className="product1-details">
                    <h1>The Original Beef Tapa Flakes</h1>
                    <p className="p1-price">{getPrice()}</p>
                    <p className="product1-description">
                        Experience the heavenly taste of our Beef Tapa Flakes, carefully harvested from
                        the clouds where flavors blend with ethereal perfection. Each bite unveils a
                        symphony of savory goodness, transporting you to culinary nirvana.
                    </p>
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
                    <div className="p1-flavor-selector">
                        {['Classic', 'Spicy', 'Sisig'].map((flavor) => (
                            <button
                                key={flavor}
                                onClick={() => handleFlavorSelection(flavor)}
                                className={selectedFlavor === flavor ? 'p1-flavor-button selected' : 'p1-flavor-button'}
                            >
                                {flavor}
                            </button>
                        ))}
                    </div>
                    <br></br>
                    <div className="p1-size-selector">
                        {['330 Grams', '510 Grams'].map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeSelection(size)}
                                className={selectedSize === size ? 'p1-size-button selected' : 'p1-size-button'}
                            >
                                {size}
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
