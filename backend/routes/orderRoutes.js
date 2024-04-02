import express from "express";
import { addOrder, fetchOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post('/addOrder', addOrder);
router.get('/fetchOrders/:userId', fetchOrders);

export default router;