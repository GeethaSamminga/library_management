const dotenv = require("dotenv")
const app = require("./app");
const connectDB = require('./data/database');

dotenv.config({ path: "./data/config.env" });

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
