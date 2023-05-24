import { Request, Response } from "express";
import { SearchBookService } from "../../services/book/SearchBookService";

const searchByToColumn = {
    title: "title",
    genre: "genre",
    synops: "synops",
    author: "author",
    language: "language",
    publisher: "publisher",
    edition: "edition"
}

class SearchBookController {


    async handle(req: Request, res: Response) {
        let term = req.query.term as string;
        if (term) {
            term = term.replace(/ /g, "&");
        }

        const search_by = req.query.search_by as keyof typeof searchByToColumn;
        const year = parseInt(req.query.year as string) || 0;
        const genre = req.query.genre as string;
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const offset = (page - 1) * perPage;


        const searchBookService = new SearchBookService();

        const books = await searchBookService.execute({
            term,
            search_by: search_by,
            year,
            genre,
            perPage,
            offset
        });

        return res.json(books);
    }
}

export { SearchBookController }