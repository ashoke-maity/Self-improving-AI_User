const dotenv = require('dotenv').config();
const express = require('express');
const {UserRegister, Userlogin} = require('../controllers/userController')

const router = express.Router();

router.post('/register', UserRegister);
router.post('/login', Userlogin);

module.exports = router;