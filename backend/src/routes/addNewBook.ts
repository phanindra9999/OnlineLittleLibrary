import { Router } from 'express';
import { BookRequestModel } from '../model/BookRequestModel';

const router = Router();

router.post('/api/contact', async (req, res) => {
    console.log(req.body);

    const bookRequestData = {
        name: req.body.name,
        email: req.body.email,
        bookTitle: req.body.bookTitle,
        genre: req.body.genre,
        message: req.body.message
    };

    try {
        const bookRequest = await BookRequestModel.create(bookRequestData);
        return res.status(201).json({ message: 'Book request submitted!', bookRequest });
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).send(error);
    }
});
export default router;