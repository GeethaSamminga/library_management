const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require('./data/database');
const cors = require('cors');

dotenv.config({ path: "./data/config.env" });


connectDB();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
