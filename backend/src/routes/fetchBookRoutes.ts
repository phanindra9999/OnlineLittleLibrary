import { Router } from 'express';
import BookModel from '../model/bookModel';

const router = Router();
router.get('/book/:sno', async (req, res) => {
    try {
        const book = await BookModel.findOne({
            where: {
                sno: req.params.sno
            }
        });
        if (book) {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(book.data);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error while fetching the book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default router;