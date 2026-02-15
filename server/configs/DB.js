const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to Database !")
};

module.exports = connectDB;