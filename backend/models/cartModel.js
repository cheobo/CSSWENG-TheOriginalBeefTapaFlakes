import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        name: {
            type: String,
        },
        selectedPackage: {
            type: String,
        },
        size: {
            type: Number,
        },
        price: {
            type: mongoose.Types.Decimal128,
        },
        quantity: {
            type: Number,
            default: 0
        }
    }
);

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: "User",
        },
        cartItems: [cartItemSchema],
        totalPrice: {
            type: mongoose.Types.Decimal128,
            required: true,
            default: 0.0,
        },
    }
);

const Cart = mongoose.model("Cart", cartSchema);


export default Cart;