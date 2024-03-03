import React, { useState, useEffect } from 'react';
import './Product3.css';
import image from '../../Assets/fprod3.JPG';

const Product3 = () => {
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
        <div className="product3-container">
            <div className="p3-details-container">
                <div className="p3-image-gallery">
                    <img src={image} alt="Negosyo Package" />
                    {/* Add additional thumbnails or a carousel as needed */}
                </div>
                <div className="product3-details">
                    <h1>Negosyo Package 1 Box 24 Bottles</h1>
                    <p className="p3-price">P4,450</p>
                    <p className="product3-description">
                        Indulge in the celestial essence of our Beef Tapa Flakes, sourced from the
                        heavens above where culinary magic unfolds. Born from clouds kissed by
                        flavor, these flakes offer a taste journey like no other, elevating
                        your dining experience to celestial heights.
                    </p>
                    <div className="p3-quantity-selector">
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
                        className="p3-add-to-cart"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                    {showWarning && (
                        <div className="p3-error-bubble">
                            {warningMessage}
                        </div>
                    )}
                    <div className="p3-flavor-selector">
                        {['Classic', 'Spicy', 'Sisig'].map((flavor) => (
                            <button
                                key={flavor}
                                onClick={() => handleFlavorSelection(flavor)}
                                className={selectedFlavor === flavor ? 'p3-flavor-button selected' : 'p3-flavor-button'}
                            >
                                {flavor}
                            </button>
                        ))}
                    </div>
                    <br></br>
                    <div className="p3-size-selector">
                        {['330 Grams'].map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeSelection(size)}
                                className={selectedSize === size ? 'p3-size-button selected' : 'p3-size-button'}
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
            <div className="p3-reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.map((review) => (
                <div key={review.id} className="p3-review">
                    <h3>{review.user}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Product3;
