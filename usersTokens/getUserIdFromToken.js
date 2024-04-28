const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

module.exports = getUserIdFromToken;
