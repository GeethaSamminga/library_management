const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require('./data/database');
const cors = require('cors');

dotenv.config({ path: "./data/config.env" });

connectDB();

// Enable CORS and handle preflight requests
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
