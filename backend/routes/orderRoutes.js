import express from "express";
import {
    addOrder,
    fetchOrders,
    fetchUserOrders,
    submitProofOfPayment,
} from "../controllers/orderController.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();

router.post('/addOrder', addOrder);
router.get('/fetchOrders/', fetchOrders);
router.get('/fetchOrders/:userId', fetchUserOrders);
router.post('/submitProofOfPayment', upload.single('proofOfPayment'), submitProofOfPayment);

export default router;