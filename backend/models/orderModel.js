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
            "Payment Not Confirmed",
            "Canceled",
            "Paid",
            "Processing",
            "Packed",
            "Shipped",
            "Delivered",
        ],
    },
    datePlaced: Date,
    dateCompleted: Date,
    proofOfPayment: {
        data: Buffer,
        contentType: String,
    },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;