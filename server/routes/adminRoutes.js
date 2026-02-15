const express = require('express');
const router = express.Router();
const {AdminLogin, AdminRegister} = require('../controllers/adminController');

router.post('/register', AdminRegister);
router.post('/login', AdminLogin);

module.exports = router;
