import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig';


export class BookRequestModel extends Model {
    public name!: string;
    public email!: string;
    public bookTitle!: string;
    public genre!: string;
    public message!: string;
}

BookRequestModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        tableName: 'bookrequests',
    }
);