import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig';

class BookModel extends Model {
    public sno!: number;
    public name!: string;
    public genre!: string;
    public data!: Buffer;
}

BookModel.init(
    {
        sno: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        genre: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'books',
    }
);

export default BookModel;