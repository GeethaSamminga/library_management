const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRouter');
const bookRoutes = require('./routes/bookRoutes');
const borrwRoutes = require('./routes/borrowingRoutes');
const reportRoutes = require('./routes/reportRoute');
const cors = require('cors');

const app = express();

dotenv.config();

// Updated CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',  // Specify the origin explicitly
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // This is required if you are sending cookies or credentials
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // To parse JSON requests
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrwRoutes);
app.use('/api/report', reportRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Nalanda Library Management System!');
});

module.exports = app;
