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

    //SAMPLE ADD TO CART POST REQUEST
    const item1 = {
        productId: '65d604cefddb5dcd908a45d4',
        name: 'The Original Beef Tapa Flakes',
        flavor: 'Classic',
        size: '330 Grams',
        price: 215.0, // You may need to calculate the price based on quantity, size, etc.
        quantity: 1
    };

    const item2 = {
        productId: '65dabdf15d585acd9d0c67f4',
        name: 'The Original Beef Tapa Flakes',
        flavor: 'Spicy',
        size: '330 Grams',
        price: 215.0, // You may need to calculate the price based on quantity, size, etc.
        quantity: 1
    };

    const item3 = {
        productId: '65d604cefddb5dcd908a45d4',
        name: 'The Original Beef Tapa Flakes',
        flavor: 'Spicy',
        size: '510 Grams',
        price: 335.0, // You may need to calculate the price based on quantity, size, etc.
        quantity: 1
    };

    const item4 = {
        productId: '65dabdf15d585acd9d0c67f5',
        name: 'Trial Pack All 3 Flavors',
        flavor: 'Classic, Spicy, and Sisig',
        size: '330 Grams',
        price: 625.0, // You may need to calculate the price based on quantity, size, etc.
        quantity: 1
    };

    const cartItems = [item1, item2, item3, item4]

    const userId = '65dabdf15d585acd9d0c67f9';
    const cart = {
        userId: userId,
        cartItems: [item2], //cartItems
        totalPrice: 0.0
    }

    const handleAddToCart = () => {
        // Send a POST request to the backend API endpoint for adding item to cart
        const response = fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                // Handle success response (optional)
                console.log('Item added to cart successfully');
                return response.json()
            })
            .then(data => {
                const cartItemsAdded = data.cartItemsAdded;
            })
            .catch(error => {
                // Handle error (optional)
                console.error('Error adding item to cart:', error);
            });
    };
    // handleAddToCart();

    // SAMPLE CLEAR CART
    const handleClearCart = () => {
        // Send a POST request to the backend API endpoint for adding item to cart
        fetch('/api/cart/clear', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to clear cart');
                }
                // Handle success response (optional)
                console.log('Cart cleared successfully');
            })
            .catch(error => {
                // Handle error (optional)
                console.error('Error clearing cart:', error);
            });
    };
    // handleClearCart();

    // SAMPLE UPDATE CART
    const itemIdToUpdate = '65db6aa8014fe881c1bf7a9d'; // Example item ID
    const newQuantity = 3; // Example new quantity
    const updateItemQuantity = async (itemId, newQuantity) => {
        try {
            const response = await fetch(`/api/cart/update/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any authentication token if required
                    //'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ userId, newQuantity })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update item quantity');
            }

            const responseData = await response.json();
            console.log(responseData.message); // Success message from the backend
            // Optionally, update the UI to reflect the updated quantity
        } catch (error) {
            console.error('Error updating item quantity:', error.message);
            // Handle error, display error message to the user, etc.
        }
    };
    // updateItemQuantity(itemIdToUpdate, newQuantity);

    // SAMPLE REMOVE FROM CART
    const itemIdToRemove = '65db6aa8014fe881c1bf7a9f'; // Example item ID

    const handleRemoveFromCart = async (itemId) => {
        try {
            const response = await fetch(`/api/cart/remove/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}` // Include authorization token if needed
                },
                body: JSON.stringify({userId})
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to remove item from cart');
            }

            const responseData = await response.json();
            console.log(responseData.message);
            // Update UI or perform any necessary actions after successful removal
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            // Handle error
        }
    };
    // handleRemoveFromCart(itemIdToRemove);

    // SAMPLE CART DATA FETCH
    const fetchCart = async () => {
        try {
            const response = await fetch(`api/cart/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${accessToken}` // Include authorization token if needed
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch cart');
            }

            const cartData = await response.json();
            console.log('User\'s cart:', cartData);
        } catch (error) {
            console.error('Error fetching cart:', error.message);
            // Handle error
        }
    };
    // fetchCart();
  
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
