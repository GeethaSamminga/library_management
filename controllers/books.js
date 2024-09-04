const Book = require("../models/book");

// Add a new book
const addBook = async (req, res) => {
    try {
        // Validate input
        const { title, author, ISBN, publicationDate, genre, numberOfCopies } = req.body;
        if (!title || !author || !ISBN || !publicationDate || !numberOfCopies) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all books with optional filters
const getBooks = async (req, res) => {
    try {
        const { genre, author } = req.query;
        const filters = {};
        if (genre) filters.genre = genre;
        if (author) filters.author = author;

        const books = await Book.find(filters);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        // Validate input
        const { title, author, ISBN, publicationDate, genre, numberOfCopies } = req.body;
        if (!title || !author || !ISBN || !publicationDate || !numberOfCopies) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
