const Borrow = require('../models/borrow');
const Book = require('../models/book');

//to get most borrow books

const getMostBorrowedBooks = async (req, res) => {
    try {
      
        const mostBorrowedBooks = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    // to tell the mongodb to include -0 -exclude 
                    borrowCount: { $sum: 1 }
                }
            },
            {
                $sort: { borrowCount: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            // convrt array into single object
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    bookId: "$_id",
                    borrowCount: 1,
                    title: "$bookDetails.title",
                    author: "$bookDetails.author",
                    availableCopies: "$bookDetails.availableCopies"
                }
            }
        ]);

        res.json(mostBorrowedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// to get active members
const getActiveMembers = async (req, res) => {

    try {
        
        const activeMembers = await Borrow.aggregate([
            {
                $group: {
                    _id: "$user", 
                    borrowCount: { $sum: 1 } 
                }
            },
            {
                $sort: { borrowCount: -1 } 
            },
            {
                $limit: 10 
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" 
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    borrowCount: 1,
                    name: "$userDetails.name",
                    email: "$userDetails.email"
                }
            }
        ]);

        res.json(activeMembers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMostBorrowedBooks,getActiveMembers };
