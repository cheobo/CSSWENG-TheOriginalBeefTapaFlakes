import express from "express";
import {
    authenticateUser,
    logoutUser,
    registerUser,
    registerAdmin
} from "../controllers/userController.js";

const router = express.Router();

router.post("/authenticate", authenticateUser);
router.post("/logout", logoutUser)
router.post("/register", registerUser);
router.post("/createadmin", registerAdmin);

export default router;