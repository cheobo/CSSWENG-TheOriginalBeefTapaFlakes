import asyncHandler from "../middlewares/asyncHandler.js";
import Cart from "../models/cartModel.js";


const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const cartItemsAdded = req.body;

    try {
        // Find Cart document of the current user
        const userCart = await Cart.findOne({ user: userId });
        if (!userCart) {
            // If the user doesn't have a cart yet, create a new cart
            const newCart = new Cart({
                user: userId,
                cartItems: [],
                totalPrice: 0
            });
            newCart.cartItems.push(cartItemsAdded);
            newCart.totalPrice = calculateTotalPrice(newCart.cartItems);
            await newCart.save();
        } else {
            await checkItems(userCart, cartItemsAdded); // Wait for the checkItems function to complete
        }
        res.status(201).json({ message: 'Item added to cart successfully', cartItemsAdded});
    } catch (error) {
        // If an error occurs, send an error response
        res.status(401).json(error);
    }

    
});

// Function to calculate total price based on cart items
const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach(cartItem => {
        totalPrice += (cartItem.price * cartItem.quantity);
    });
    return totalPrice;
};

// Function to check if there is duplicating products
const checkItems = async (cart, newCartItem) => {
    try {
        // Check if the newCartItem already exists in the cart
        const existingItem = cart.cartItems.find(
            (item) =>
                item.productId.toString() === newCartItem.productId &&
                item.selectedPackage === newCartItem.selectedPackage
        );

        if (existingItem) {
            // If the item already exists in the cart, increment its quantity
            existingItem.quantity += newCartItem.quantity;
        } else {
            // If the item does not exist in the cart, add it to the cart
            cart.cartItems.push(newCartItem);
        }

        cart.totalPrice = calculateTotalPrice(cart.cartItems);
        // Save the changes to the cart
        await cart.save();
    } catch (error) {
        console.error('Error checking items:', error);
    }
};

const removeFromCart = asyncHandler(async (req, res) => {
    try {
        // Find the user's cart
        const userCart = await Cart.findOne({ user: req.user._id}); 
        const itemId = req.params.id; // Extract itemId from the request parameters

        // If the cart exists, clear it
        if (userCart) {
            const cartItemIndex = userCart.cartItems.findIndex(item => item._id.equals(itemId));
            if (cartItemIndex === -1) {
                res.status(404).json({ message: 'Item not found in cart' });
                return;
            }
            
            userCart.cartItems.splice(cartItemIndex, 1);
            userCart.totalPrice = calculateTotalPrice(userCart.cartItems);
            
            await userCart.save();
            res.status(200).json({ message: 'Cart item removed successfully'});
        } else {
            res.status(404).json({ message: 'User does not have a cart.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Error removing from cart:'});
    }
});

const updateCartItem = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id 
        const itemId = req.params.id; // Extract itemId from the request parameters
        const newQuantity = req.body.newQuantity; // Extract newQuantity from the request body

        // Find the user's cart
        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            return res.status(404).json({ message: 'User does not have a cart.' });
        }

        // Find the cartItem by itemId in the cartItems array
        const cartItemIndex = userCart.cartItems.findIndex(item => item._id.equals(itemId));
        

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in the cart.' });
        }

        // Update the quantity of the cartItem
        userCart.cartItems[cartItemIndex].quantity = newQuantity;
        // Update totalPrice
        userCart.totalPrice = calculateTotalPrice(userCart.cartItems);

        // Save the changes to the user's cart
        await userCart.save();

        // Send a success response
        res.status(200).json({ message: 'Item quantity updated successfully' });
    } catch (error) {
        console.error('Error updating item quantity:', error);
        res.status(500).json({ error: 'Failed to update item quantity' });
    }
});

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id 

    // Find the cart for the current user
    const userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
        res.status(404).json({ message: 'Cart not found for this user' });
    } else {
        res.status(200).json(userCart);
    }
});

const clearCart = asyncHandler(async (req, res) => {
    try {
        // Find the user's cart
        const userCart = await Cart.findOne({ user: req.body.userId }); // change to "req.user._id" after implementing user authentication 
        // If the cart exists, clear it
        if (userCart) {
            await userCart.deleteOne({ user: req.body.user })
            res.status(200).json({ message: 'Cart cleared successfully'});
        } else {
            res.status(404).json({ message: 'User does not have a cart.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Error clearing cart:'});
    }
});


// To be implemented on Sprint 3
const checkout = asyncHandler(async (req, res) => {

});

export {
        addToCart,
        removeFromCart, 
        updateCartItem,
        getCart,
        clearCart
};