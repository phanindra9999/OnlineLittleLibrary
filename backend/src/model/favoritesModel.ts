
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig';
import BookModel from './bookModel';
import UserModel from './userModel';

class FavoriteModel extends Model {
    public username!: string;
    public sno!: number;

    public readonly book?: BookModel;

}

FavoriteModel.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize,
    tableName: 'favorites',
});


FavoriteModel.belongsTo(UserModel, { foreignKey: 'username' });
FavoriteModel.belongsTo(BookModel, { foreignKey: 'sno' });

export default FavoriteModel;