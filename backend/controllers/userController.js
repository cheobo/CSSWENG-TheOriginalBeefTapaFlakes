import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

const authenticateUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({ message: "User logged in successfully. Redirecting you to the home page.", token: generateToken(res, user)});
        return;
    } else {
        res.status(401).json({ message: "Invalid email or password."});
        return;
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User logged out." });
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, confirmPassword} = req.body;
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    
    if (emailExists) {
        res.status(400).json({ message: "Email is already registered.", errorOption: "email"});
        return;
    }

    if (usernameExists) {
        res.status(400).json({ message: "Username is already registered. Please choose another.", errorOption: "username"});
        return;
    }

    if (password === confirmPassword) {
        const user = await User.create({
            email,
            username,
            password
        });
        res.status(201).json({ message: "Registration Successful. Redirecting you to the login page."})
    } else {
        res.status(400).json({message: "Passwords did not match.", errorOption: "password"});
    }
});

const registerAdmin = asyncHandler(async (req, res) => {
    const { email, username, password, confirmPassword} = req.body;
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    
    if (emailExists) {
        res.status(400).json({ message: "Email is already registered.", errorOption: "email"});
        return;
    }

    if (usernameExists) {
        res.status(400).json({ message: "Username is already registered. Please choose another.", errorOption: "username"});
        return;
    }

    if (password === confirmPassword) {
        const user = await User.create({
            email,
            username,
            password,
            isAdmin: true
        });
        res.status(201).json({ message: "Registration Successful."})
    } else {
        res.status(400).json({message: "Passwords did not match.", errorOption: "password"});
    }
});

const getUsersById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
  
    if (user) {
      return res.json(user);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
});

export {
    authenticateUser,
    logoutUser,
    registerUser,
    registerAdmin,
    getUsersById
};
