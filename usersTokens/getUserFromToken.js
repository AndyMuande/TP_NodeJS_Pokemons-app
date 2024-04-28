const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const getUserFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        return user;
    } catch (error) {
        return null;
    }
};

module.exports = getUserFromToken;
