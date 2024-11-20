import express from 'express';
import BookModel from '../model/bookModel';

const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await BookModel.findAll({
            attributes: { exclude: ['data'] }
        });
        res.json(books);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unexpected error occured." });
        }
    }
});

export default router;