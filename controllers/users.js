const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tokengenerator = require('../utils/features');


// Create a new user
const createUsers = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields (name, email, password, role) are required' });
        }
        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();


        Tokengenerator(user,res,"registered successfully",200);
        

    } catch (error) {
        console.error("Error in createUsers:", error); 
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

      Tokengenerator(user,res,"login successfully",200);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        console.log('Fetched Users:', users);
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
