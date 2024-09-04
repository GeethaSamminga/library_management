const Book = require("../models/book");
const Borrow = require("../models/borrow");


// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body;
         console.log(req.body.bookId)

        // Find the book by ID
        const book = await Book.findById(bookId);

        // Check if the book exists
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the book is available
        if (book.numberOfCopies < 1) {
            return res.status(400).json({ error: 'Book is not available' });
        }

        // Create a new borrow record
        const borrow = new Borrow({
            user: req.user._id,
            book: bookId
        });

        // Decrease the number of copies available
        book.numberOfCopies -= 1;
        await book.save();
        await borrow.save();

        // Respond with the borrow record
        res.status(201).json(borrow);
    } catch (error) {
        console.error('Error borrowing book:', error.message); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

// Return a book
const returnBook = async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id).populate('book');

        if (!borrow) return res.status(404).json({ error: 'Borrow record not found' });

        borrow.returnedAt = new Date();
        await borrow.save();

        const book = borrow.book;
        book.numberOfCopies += 1;
        await book.save();

        res.json(borrow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View borrow history
const getBorrowHistory = async (req, res) => {
    try {
        console.log('Authenticated User:', req.user); // Log user information
        const history = await Borrow.find({ user: req.user._id }).populate('book');
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    borrowBook,
    returnBook,
    getBorrowHistory
};
