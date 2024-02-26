import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

/* Status 201 on success
 * Status 400 otherwise
 * Generates a token with the record's
 * database ID
 */
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("Email is already registered");
    }

    const user = await User.create({
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user details");
    }
});

/* Status 400 on failure
 * Generates a token with the matching record's
 * database ID
 */
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