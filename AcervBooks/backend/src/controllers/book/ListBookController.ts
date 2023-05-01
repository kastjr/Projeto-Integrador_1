import { Request, Response } from "express";
import { ListBookService } from '../../services/book/ListBookService';

class ListBookController {
    async handle(req: Request, res: Response){
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;
        const offset = (page - 1) * perPage;

        const listBooksService = new ListBookService();

        const books = await listBooksService.execute({
            perPage: perPage,
            offset: offset,
        });

        return res.json(books);

    }
}

export { ListBookController }