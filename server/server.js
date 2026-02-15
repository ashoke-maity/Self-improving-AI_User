const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/DB');
connectDB();
// USER IMPORTS
const user = require('./routes/userRoutes');
// ADMIN IMPORTS
const admin = require('./routes/adminRoutes');
const app = express();
app.use(express.json());

// users
// login/register
app.use('/self_improving_ai/user', user); 

// admins
// admin login/register
app.use(`${process.env.ADMIN_ROUTE}`, admin);

app.listen(process.env.PORT, 
    console.log(`The server has started on ${process.env.PORT}`)
)