import express from 'express';
import FavoriteModel from '../model/favoritesModel';
import BookModel from '../model/bookModel';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/favorites/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const favorites = await FavoriteModel.findAll({ where: { username } });
        const favoriteSNOs = favorites.map(favorite => favorite.sno);
        const favoriteBooks = await BookModel.findAll({
            where: { sno: { [Op.in]: favoriteSNOs } },
            attributes: { exclude: ['data'] }
        });
        res.send({ favorites: favoriteBooks });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'There was a problem retrieving the favorite books' });
    }
});

router.delete('/favorites/removeFavorite', async (req, res) => {
    const { username, sno, bookname } = req.body;
    try {
        const bookToRemove = await FavoriteModel.findOne({ where: { username, sno } });
        if (bookToRemove) {
            await bookToRemove.destroy();
            res.status(200).json({ message: "Book removed from favorites." });
        } else {
            res.status(404).json({ message: "Book not found in favorites." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'There was a problem with your request.' });
    }
});
export default router;