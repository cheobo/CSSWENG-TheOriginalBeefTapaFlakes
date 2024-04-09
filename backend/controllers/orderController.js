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
            status: "Payment Not Confirmed",
            datePlaced: req.body.currentDate
        });
    }

    await Cart.deleteOne({ user: userId });
    const newCart = new Cart({ user: userId, cartItems: [] });
    await newCart.save();

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

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status, dateCompleted } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (order) {
        order.status = status;
        if (order.status === 'Delivered'){
            order.dateCompleted = dateCompleted;
        } else {
            order.dateCompleted === null;
        }
        await order.save();
        res.json({ message: 'Order status updated successfully' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addOrder,
    fetchOrders,
    fetchUserOrders,
    submitProofOfPayment,
    updateOrderStatus,
};