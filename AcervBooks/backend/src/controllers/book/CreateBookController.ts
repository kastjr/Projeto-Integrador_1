import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/CreateBookService";

class CreateBookController {
    async handle(req: Request, res: Response) {
        const { title, synops, genre, year, volume, edition, language, author, publisher } = req.body;
        const createBookService = new CreateBookService();

        if(!req.file){
            throw new Error('error upload file');
        }{
            const { originalname, filename: image} = req.file;
            
            const book = await createBookService.execute({
                image: image,
                title: title,
                synops: synops,
                genre: genre,
                year:  year ? parseInt(year) : 0,
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

export { CreateBookController }