const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String
    },
    numberOfCopies: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
