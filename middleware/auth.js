const jwt = require('jsonwebtoken');
const User = require('../models/users');

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        return res.status(409).json({
            success: false,
            message: 'Please Login',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = await User.findById(decoded._id);
        console.log(req.user)
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};


const isAdmin = (req, res, next) => {
    const user = req.user; 
    console.log('Authenticated User:', user);

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    if (user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied. Admins only can do this task.' });
    }
};

const isMember = (req, res, next) => {
    const user = req.user; 
    console.log('Authenticated User:', user);

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    if (user.role === 'member') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied.' });
    }
};

module.exports = {isAuthenticated,isAdmin,isMember};