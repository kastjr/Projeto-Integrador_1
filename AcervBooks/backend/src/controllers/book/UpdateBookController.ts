import { Request, Response } from 'express';
import { UpdateBookService } from '../../services/book/UpdateBookService';

class UpdateBookController {
    async handle(req: Request, res: Response) {
        const { book_id, title, synops, genre, year, volume, edition, language, author, publisher } = req.body;
        const updateBookService = new UpdateBookService();

        if (!req.file) {
            throw new Error('error upload file');
        } {
            const { originalname, filename: image } = req.file;

            const book = await updateBookService.execute({
                book_id: book_id,
                image: image,
                title: title,
                synops: synops,
                genre: genre,
                year: year ? parseInt(year) : 0,
                volume: volume ? parseInt(volume) : 0,
                edition: edition,
                language: language,
                author: author,
                publisher: publisher
            });

            return res.json(book);
        }
    }
}

export { UpdateBookController }