import { Request, Response } from "express";
import { SearchBookService } from "../../services/book/SearchBookService";

class SearchBookController{
    async handle(req: Request, res: Response){
        const { term, search_by, year, genre} = req.body;
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const offset = (page - 1) * perPage;


        const searchBookService = new SearchBookService();

        const books = await searchBookService.execute({
            term,
            search_by,
            year,
            genre,
            perPage,
            offset
        });

        return res.json(books);
    }
}

export { SearchBookController }