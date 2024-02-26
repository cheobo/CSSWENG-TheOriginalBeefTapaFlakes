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
            <img src={image} alt="The Original Beef Tapa Flakes" />
            {/* Add additional thumbnails or a carousel as needed */}
            </div>
            <div className="product-details">
            <h1>The Original Beef Tapa Flakes</h1>
            <p className="price">P215 - P335</p>
            <p className="product-description">
            Experience the heavenly taste of our Adobo Flakes, carefully harvested from
            the clouds where flavors blend with ethereal perfection. Each bite unveils a
            symphony of savory goodness, transporting you to culinary nirvana.
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
                {['330 Grams', '510 Grams'].map((size) => (
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
  
  export default Product1;
