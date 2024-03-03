import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

/* Status 201 on success
 * Status 400 otherwise
 * Generates a token with the record's
 * database ID
 * */
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
        //generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            email: user.email,
            username: user.username
        });
    } else {
        res.status(400);
        throw new Error("Invalid user details");
    }
});

/* Status 400 on failure
 * Generates a token with the matching record's
 * database ID
 * */
const authenticateUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
       generateToken(res, user._id);

       res.json({
           _id: user._id,
           email: user.email,
           isAdmin: user.isAdmin
       });
    } else {
        res.status(400);
        throw new Error("Invalid user details");
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
});

export {
    registerUser,
    authenticateUser,
    getUsers
};
