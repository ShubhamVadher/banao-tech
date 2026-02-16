const User = require('../models/user');
const jwt = require('jsonwebtoken');

const key = process.env.JWT;

const isloggedin = async (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "You must login first" });
        }

        const data = jwt.verify(req.cookies.token, key);

        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log("Auth Error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = isloggedin;
