const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "nalanda_library",
       
    })
    .then(() => console.log("Database is connected"))
    .catch((e) => {
        console.error("Database connection failed:", e);
       
    });
};

module.exports=connectDB
