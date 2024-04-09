import express from "express";
import {
    authenticateUser,
    logoutUser,
    registerUser,
    registerAdmin
} from "../controllers/userController.js";
import { protect } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/authenticate", authenticateUser);
router.post("/logout", logoutUser)
router.post("/register", registerUser);
router.post("/createadmin", protect, registerAdmin);

export default router;