import express from "express";
import {
    getProducts,
    getProductById,
    updateProduct,
    addProduct,
    removeProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId/:packageId", protect, updateProduct);
router.post("/add", protect, addProduct)
router.delete("/remove/:productId/:packageId", protect, removeProduct)

export default router;