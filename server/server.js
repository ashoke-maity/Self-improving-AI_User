const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// middleware
app.use(express.json());

// server listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});