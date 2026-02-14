const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/DB');
connectDB();
const userLogin = require('./routes/userRoutes');
const app = express();
app.use(express.json());

// login/register
app.use('/self_improving_ai/user', userLogin); 

app.listen(process.env.PORT, 
    console.log(`Server has started on port ${process.env.PORT}`)
);