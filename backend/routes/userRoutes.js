import express from "express";
import {
    authenticateUser,
    logoutUser,
    registerUser,
    registerAdmin,
    getUsersById
} from "../controllers/userController.js";
import { protect } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/authenticate", authenticateUser);
router.post("/logout", logoutUser)
router.post("/register", registerUser);
router.post("/createadmin", protect, registerAdmin);
router.get("/:userId", getUsersById);

export default router;