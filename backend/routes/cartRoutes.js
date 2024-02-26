import express from "express";
import {
    addToCart,
    removeFromCart, 
    updateCartItem,
    getCart,
    clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.delete("/remove/:id", removeFromCart);
router.put("/update/:id", updateCartItem);
router.get("/:userId", getCart);
router.delete("/clear", clearCart);

export default router;