import jwt from "jsonwebtoken";

const generateToken = (res, user ) => {
    const _id = user._id;
    const email = user.email;
    const isAdmin = user.isAdmin;
    const username = user.username;

    const token = jwt.sign({ _id, email, isAdmin, username }, process.env.JWT_SECRET, {
        expiresIn: "1hr" // Expires in 1hr
    });
    return token;
};

export default generateToken