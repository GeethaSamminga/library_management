const dotenv = require("dotenv")
const app = require("./app");
const connectDB = require('./data/database');

dotenv.config({ path: "./data/config.env" });
// Log environment variables to debug
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
