import express from 'express';
import FavoritModel from '../model/favoritesModel';
import { UniqueConstraintError } from 'sequelize';

const router = express.Router();

router.post('/addFavorite', async (req, res) => {
    const { username, sno } = req.body;
    try {
        await FavoritModel.create({ username, sno });
        res.status(200).json({ message: 'Book added to favorites.' });
    } catch (err) {
        console.error(err);
        if (err instanceof UniqueConstraintError) {
            return res.status(409).json({ message: 'Book is already in favorite.' });
        }
        return res.status(500).json({ message: 'There was a problem with your request.' });
    }
});
export default router;