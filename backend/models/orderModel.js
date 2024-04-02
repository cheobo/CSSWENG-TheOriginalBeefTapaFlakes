import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    product: String,
    quantity: Number,
    totalPrice: Number,
    status: {
        type: String,
        enum: [
            "Canceled",
            "Confirmed",
            "Delivered",
            "Paid",
            "Payment not confirmed",
            "Processing",
            "Shipped",
        ],
    },
    datePlaced: Date,
    dateCompleted: Date
});

const Order = mongoose.model("Order", orderSchema);

export default Order;