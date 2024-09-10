const express = require('express');
const { addBook, updateBook, deleteBook, getBooks,  } = require('../controllers/books');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/add', isAuthenticated, isAdmin,addBook); 
router.put('/update/:id', isAuthenticated, isAdmin, updateBook);
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteBook); 
router.get('/getbooks', isAuthenticated, getBooks); 
module.exports = router;
