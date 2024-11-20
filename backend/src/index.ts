import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import userSignUpRoutes from './routes/userSignUpRoutes';
import userLoginRoutes from './routes/userLoginRoutes';
import cors from 'cors';
import userProfileUpdateRoutes from './routes/userProfileUpdateRoutes'
import { syncDatabaseAndLoadBooks } from '../src/controller/bookLoadingScript';
import booksRoutes from './routes/booksRoutes'
import fetchBooksRoutes from './routes/fetchBookRoutes'
import favoritesRoutes from './routes/favoritesRoutes'
import fetchFavoriteRoutes from './routes/fetchFavoritesRoutes'
import addNewBook from './routes/addNewBook'
import './model/bookModel';
import './model/userModel';
import './model/dbAssociations';
import './model/favoritesModel';

dotenv.config();

const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY!;

const app: Express = express();


app.use(express.json());
syncDatabaseAndLoadBooks();
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(morgan('dev'));
app.use(cors({
  exposedHeaders: ["*"]
}));

app.use('/user', userSignUpRoutes);
app.use('/user', userLoginRoutes);
app.use('/user', userProfileUpdateRoutes);
app.use('/user', booksRoutes);
app.use('/user', fetchBooksRoutes);
app.use('/user', favoritesRoutes);
app.use('/user', fetchFavoriteRoutes);
app.use('/user', addNewBook);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
