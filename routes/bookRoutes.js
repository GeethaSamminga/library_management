const express = require('express');
const { addBook, updateBook, deleteBook, getBooks,  } = require('../controllers/books');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/add', isAuthenticated, isAdmin, addBook); // Only Admin can add books
router.put('/update/:id', isAuthenticated, isAdmin, updateBook); // Only Admin can update books
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteBook); // Only Admin can delete books
router.get('/getbooks', isAuthenticated, getBooks); // All authenticated users can view books

module.exports = router;
