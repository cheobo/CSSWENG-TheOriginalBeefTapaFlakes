import express from "express";
import {
    authenticateUser,
    logoutUser,
    registerUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/authenticate", authenticateUser);
router.post("/logout", logoutUser)
router.post("/register", registerUser);

export default router;