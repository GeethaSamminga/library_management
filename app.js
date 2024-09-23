const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRouter');
const bookRoutes = require('./routes/bookRoutes');
const borrwRoutes = require('./routes/borrowingRoutes');
const reportRoutes=require('./routes/reportRoute')
const cors = require('cors');  // Import cors


const app = express();

dotenv.config();
app.use(cors({
    origin: '*', // Allow all origins, or you can restrict it to specific domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // If you want to allow credentials like cookies
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow',borrwRoutes);
app.use('/api/report',reportRoutes)



app.get('/', (req, res) => {
    res.send('Welcome to the Nalanda Library Management System!');
});

module.exports = app;
