const express = require('express');
const router = express.Router();
const { createUsers, getUsers, loginUser } = require('../controllers/users');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


router.post('/register', createUsers); 
router.post('/login', loginUser,); 


router.get('/getusers',isAuthenticated, isAdmin, getUsers); 


module.exports = router;