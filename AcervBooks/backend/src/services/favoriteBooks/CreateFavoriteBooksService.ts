import prismaClient from "../../prisma";

interface FavoriteBooksRequest{
    user_id: string;
    book_id: string;
}

class CreateFavoriteBooksService {
    async execute({ user_id, book_id }: FavoriteBooksRequest){
        const book_saved = await prismaClient.favoriteBooks.create({
            data: {
                user_id: user_id,
                book_id: book_id
            },
            select: {
                id: true,
                user_id: true,
                book_id: true,
            }
        });

        return book_saved;
    }
}

export { CreateFavoriteBooksService };