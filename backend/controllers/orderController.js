import nodemailer from "nodemailer";
import asyncHandler from "../middlewares/asyncHandler.js";
import mailTransporter  from "../utils/mailTransporter.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import cart from "../data/cart.js";

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
    const orders = await Order.findOne({ userId: req.param.userId });

    res.status(200).json(orders);
});

export { addOrder, fetchOrders };