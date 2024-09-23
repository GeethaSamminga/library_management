const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require('./data/database');
const cors = require('cors');

dotenv.config({ path: "./data/config.env" });

// Connect to the database
connectDB();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If handling credentials
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
