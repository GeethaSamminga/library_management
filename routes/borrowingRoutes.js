const express = require('express');

const { isAuthenticated, isMember } = require('../middleware/auth');
const { borrowBook, returnBook, getBorrowHistory } = require('../controllers/borrowing');
const router = express.Router();

router.post('/getbook',isAuthenticated,isMember, borrowBook);
router.put('/return/:id',isAuthenticated,isMember,returnBook);
router.get('/history',isAuthenticated,isMember,getBorrowHistory);

module.exports = router;
