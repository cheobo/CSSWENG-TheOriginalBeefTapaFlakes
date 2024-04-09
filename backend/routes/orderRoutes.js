import express from "express";
import {
    addOrder,
    fetchOrders,
    submitProofOfPayment,
    updateOrderStatus,
} from "../controllers/orderController.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();

router.post('/addOrder', addOrder);
router.get('/fetchOrders/:userId', fetchOrders);
router.post('/submitProofOfPayment', upload.single('proofOfPayment'), submitProofOfPayment);
router.patch('/updateOrderStatus/:orderId', updateOrderStatus);

export default router;