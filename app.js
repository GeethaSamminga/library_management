const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRouter');
const bookRoutes = require('./routes/bookRoutes');
const borrwRoutes = require('./routes/borrowingRoutes');
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow',borrwRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Nalanda Library Management System!');
});

module.exports = app;
