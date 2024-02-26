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

    // Initialize the selectedFlavor state to "Classic"
    const [selectedFlavor, setSelectedFlavor] = useState('Classic');

    // Initialize the selectedSize state to "330 Grams"
    const [selectedSize, setSelectedSize] = useState('330 Grams');
  
    // Update state when input changes
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Function to handle flavor selection
    const handleFlavorSelection = (flavor) => {
    setSelectedFlavor(flavor);
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
            <img src={image} alt="Negosyo Package" />
            {/* Add additional thumbnails or a carousel as needed */}
            </div>
            <div className="product-details">
            <h1>Negosyo Package 1 Box 24 Bottles</h1>
            <p className="price">P4,450</p>
            <p className="product-description">
            Indulge in the celestial essence of our Adobo Flakes, sourced from the
            heavens above where culinary magic unfolds. Born from clouds kissed by
            flavor, these flakes offer a taste journey like no other, elevating
            your dining experience to celestial heights.
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
            <div className="flavor-selector">
                {['Classic', 'Spicy', 'Sisig'].map((flavor) => (
                    <button
                        key={flavor}
                        onClick={() => handleFlavorSelection(flavor)}
                        className={selectedFlavor === flavor ? 'flavor-button selected' : 'flavor-button'}
                    >
                        {flavor}
                    </button>
                ))}
            </div>
            <br></br>
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
  
  export default Product3;
