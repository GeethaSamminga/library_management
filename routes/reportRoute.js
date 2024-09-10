const express = require('express');
const { getMostBorrowedBooks, getActiveMembers } = require('../controllers/report');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/most-borrowed', isAuthenticated, isAdmin, getMostBorrowedBooks);
router.get('/most-active',isAuthenticated,isAdmin,getActiveMembers)

module.exports = router;
