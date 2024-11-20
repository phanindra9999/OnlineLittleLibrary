import BookModel from '../model/bookModel';
import fs from 'fs/promises';
import path from 'path';
import sequelize from '../config/databaseConfig';

const dirPath = path.join(__dirname, '../books');

export async function syncDatabaseAndLoadBooks() {
    try {
        await sequelize.sync();
        console.info("Database & tables created!");

        const genres = await fs.readdir(dirPath);

        for (let genre of genres) {
            const genrePath = path.join(dirPath, genre);
            const files = await fs.readdir(genrePath);

            for (let file of files) {
                const filePath = path.join(genrePath, file);
                const data = await fs.readFile(filePath);

                // Reformat the book's name
                let name = file.split(".pdf")[0];
                name = name.replace(/-/g, " ");

                // Try to find the book
                const book = await BookModel.findOne({
                    where: { name: name },
                });

                // If the book wasn't found, create a new one
                if (!book) {
                    await BookModel.create({
                        name: name,
                        genre: genre,
                        data: data,
                    });

                    console.log(`Inserted file: ${name}`);
                }
            }
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}