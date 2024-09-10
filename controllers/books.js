const Book = require("../models/book");

// Add a new book
const addBook = async (req, res) => {
    try {
        const { title, author, ISBN, publicationDate, genre, numberOfCopies } = req.body;
        
        
        if (!title || !author || !ISBN || !publicationDate || !genre || !numberOfCopies) {
            return res.status(400).json({ error: 'Fields (title, author, ISBN, publicationDate, genre, numberOfCopies) are required' });
        }

        const book = new Book(req.body);
        await book.save();
        
       
        const savedBook = await Book.findById(book._id).select('-createdAt -updatedAt -__v');

        res.status(201).json(savedBook);

    } catch (error) {

        if (error.code === 11000) {
             return res.status(400).json({ error: `A book with the ISBN '${req.body.ISBN}' already exists.` });
        }

       
        res.status(400).json({ error: error.message });
    }
};


// Get all books with optional filters
const getBooks = async (req, res) => {
    try {
        console.log(req.query);
        const { genre, author } = req.query;
        const filters = {};

     
        if (genre) filters.genre = genre;
        if (author) filters.author = author;

      
        const books = await Book.find(filters).select('-createdAt -updatedAt -__v');
        
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a book
const updateBook = async (req, res) => {
    try {
        const { title, author, ISBN, publicationDate, genre, numberOfCopies } = req.body;
        
        if (!title || !author || !ISBN || !publicationDate || !genre || !numberOfCopies) {
            return res.status(400).json({ error: 'Fields (title, author, ISBN, publicationDate, genre, numberOfCopies) are required' });
        }
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .select('-createdAt -updatedAt -__v'); 
        
        if (!book) return res.status(404).json({ error: 'Book not found' });

        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBook,
    getBooks,
    updateBook,
    deleteBook
};
