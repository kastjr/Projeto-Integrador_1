import { Request, Response } from 'express';
import { CreateFavoriteBooksService } from '../../services/favoriteBooks/CreateFavoriteBooksService'

class CreateFavoriteBooksController {
    async handle(req: Request, res: Response) {
        
        const { user_id, book_id} = req.body;

        const createFavoriteBooksService = new CreateFavoriteBooksService();

        const favoriteBooks = await createFavoriteBooksService.execute({
            user_id: user_id,
            book_id: book_id
        });

        return res.json(favoriteBooks);

    }

}

export { CreateFavoriteBooksController }