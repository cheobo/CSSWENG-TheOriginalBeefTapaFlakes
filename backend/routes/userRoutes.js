import express from "express";
import {
    registerUser,
    authenticateUser,
    getUsers
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.get("/", getUsers);

export default router;