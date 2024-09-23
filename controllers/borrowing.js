const Book = require("../models/book");
const Borrow = require("../models/borrow");


// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        console.log(req.body.bookId);

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the book is available
        if (book.numberOfCopies < 1) {
            return res.status(400).json({ error: 'Book is not available' });
        }

        const borrow = new Borrow({
            user: req.user._id,
            book: bookId
        });

        book.numberOfCopies -= 1;
        await book.save();
        await borrow.save();

        const borrowWithoutVersion = await Borrow.findById(borrow._id).select('-__v');

        res.status(201).json(borrowWithoutVersion);
    } catch (error) {
        console.error('Error borrowing book:', error.message);
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

        res.json({
           success:true,
            message:"book returned successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// View borrow history
const getBorrowHistory = async (req, res) => {
    try {
        console.log('Authenticated User Globally:', req.user); 
        
        const history = await Borrow.find({ user: req.user._id }).populate('book');
        console.log('Borrow History Globally:', history); 

        const formattedHistory = history
            .filter(record => record.user && record.book) 
            .map(record => ({
                user: {
                    _id: record.user._id,
                    username: req.user.username 
                },
                book: {
                    _id: record.book._id,
                    title: record.book.title,
                    author: record.book.author
                }
            }));

        res.json({
            borrowCount: formattedHistory.length,
            history: formattedHistory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    borrowBook,
    returnBook,
    getBorrowHistory
};
