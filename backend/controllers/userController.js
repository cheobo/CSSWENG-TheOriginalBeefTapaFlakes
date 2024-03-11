import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

const authenticateUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            token: generateToken(res, user),
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username
        });
    } else {
        res.status(400);
        throw new Error("Invalid user details");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User logged out" });
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
        res.status(400);
        throw new Error("Email is already registered");
    }

    if (usernameExists) {
        res.status(400);
        throw new Error("Username is already registered");
    }

    const user = await User.create({
        email,
        username,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username
        });
    } else {
        res.status(400);
        throw new Error("Invalid user details");
    }
});

export {
    authenticateUser,
    logoutUser,
    registerUser,
};
