import jwt from "jsonwebtoken";

const generateToken = (res, user ) => {
    const { userId, email, isAdmin, username } = user;
    const token = jwt.sign({ userId, email, isAdmin, username }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    return token;
};

export default generateToken