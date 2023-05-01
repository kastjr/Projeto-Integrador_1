import { Request, Response } from "express";
import { DeleteFavoriteBooksService } from '../../services/favoriteBooks/DeleteFavoriteBooksService';

class DeleteFavoriteBooksController {
    async handle(req: Request, res: Response) {
        const favoriteBooks_id = req.query.favoriteBooks_id as string;

        const deleteFavoriteBooksService = new DeleteFavoriteBooksService();

        const favoriteBooks = await deleteFavoriteBooksService.execute({
            favoriteBooks_id: favoriteBooks_id
        });

        return res.json(favoriteBooks);
    }
}

export { DeleteFavoriteBooksController }