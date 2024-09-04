const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tokengenerator = require('../utils/features');


// Create a new user
const createUsers = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();


        Tokengenerator(user,res,"registered successfully",200);
        

    } catch (error) {
        console.error("Error in createUsers:", error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

      Tokengenerator(user,res,"login successfully",200);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('Fetched Users:', users); // Debug log
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getUsers,
    createUsers,
    loginUser
}
