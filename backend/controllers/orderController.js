import asyncHandler from "../middlewares/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

const addOrder = asyncHandler(async(req, res) => {
    const userId = req.body.userId;
    const cart = await Cart.findOne({user: req.body.userId});

    for(let i = 0; i < cart.cartItems.length; i++) {
        await Order.create({
            userId,
            product: `${cart.cartItems[i].name}  ${cart.cartItems[i].selectedPackage}`,
            quantity: cart.cartItems[i].quantity,
            totalPrice: cart.cartItems[i].price * cart.cartItems[i].quantity,
            status: "Processing",
            datePlaced: req.body.currentDate
        });
    }

    await Cart.deleteOne({ user: userId });

    res.status(200).json({ message: "Order created" });
});

const fetchOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({});

    res.status(200).json(orders);
});

const fetchUserOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({userId: req.params.userId});

    res.status(200).json(orders);
});

const submitProofOfPayment = asyncHandler(async (req, res) => {
    const orderId = req.body.orderId;

    const order = await Order.findById(orderId);

    if (order) {
        if (req.file) {
            order.proofOfPayment = {
                contentType: req.file.mimetype,
                data: req.file.buffer,
            };
            await order.save();

            res.status(200).json('File successfully uploaded');
        } else {
            res.status(400);
            throw new Error('No file uploaded');
        }
    } else {
        res.status(400);
        throw new Error("Invalid orderId");
    }
});

export {
    addOrder,
    fetchOrders,
    fetchUserOrders,
    submitProofOfPayment,
};