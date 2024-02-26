import React, { useState, useEffect } from 'react';
import './Product2.css';
import image from '../../Assets/fprod2.JPG';

const Product2 = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Initialize quantity state to 1
    const [quantity, setQuantity] = useState(1);

    // Initialize the selectedSize state to "330 Grams"
    const [selectedSize, setSelectedSize] = useState('330 Grams');
  
    // Update state when input changes
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Function to update the selected size
    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    // Example review data
    const [reviews] = useState([
        { id: 1, user: 'John Doe', rating: 5, comment: 'Great product, highly recommend!' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Really good, but the size was slightly off.' },
        // Add more reviews as needed
    ]);
  
    return (
      <div className="product-container">
        <div className="details-container">
            <div className="image-gallery">
            <img src={image} alt="Trial Pack All 3 Flavors" />
            {/* Add additional thumbnails or a carousel as needed */}
            </div>
            <div className="product-details">
            <h1>Trial Pack All 3 Flavors</h1>
            <p className="price">P625</p>
            <p className="product-description">
            Dive into a celestial feast with our Adobo Flakes, crafted from clouds where
            flavor reigns supreme. Delicately harvested and expertly seasoned, each bite
            offers a glimpse into the divine, leaving taste buds enchanted and cravings
            satisfied.
            </p>
            <div className="quantity-selector">
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
            <button className="add-to-cart">ADD TO CART</button>
            <div className="size-selector">
                {['330 Grams'].map((size) => (
                    <button
                        key={size}
                        onClick={() => handleSizeSelection(size)}
                        className={selectedSize === size ? 'size-button selected' : 'size-button'}
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
        <div className="reviews-section">
            <h2>Customer Reviews</h2>
            {reviews.map((review) => (
            <div key={review.id} className="review">
                <h3>{review.user}</h3>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
            </div>
            ))}
        </div>
      </div>
    );
  };
  
  export default Product2;
