// dbAssociations.ts

import UserModel from "./userModel";
import BookModel from "./bookModel";
import FavoriteModel from "./favoritesModel";

UserModel.belongsToMany(BookModel, { through: FavoriteModel, foreignKey: 'username' });
BookModel.belongsToMany(UserModel, { through: FavoriteModel, foreignKey: 'sno' });