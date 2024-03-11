import express from "express";
import {
    getProducts,
    getProductById,
    updateProductInventory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);

router.put("/:productId", updateProductInventory);

export default router;