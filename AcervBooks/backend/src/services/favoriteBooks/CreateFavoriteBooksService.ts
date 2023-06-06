import prismaClient from "../../prisma";

interface FavoriteBooksRequest{
    user_id: string;
    book_id: string;
}

class CreateFavoriteBooksService {
    async execute({ user_id, book_id }: FavoriteBooksRequest){
        const bookAlreadyExits = await prismaClient.favoriteBooks.findFirst({
            
            where: {
                AND: [
                    {book_id: book_id},
                    {user_id: user_id},
                ]

            }
        });

        if(bookAlreadyExits){
            throw new Error("Favorite book already exits");
        }

        const favoriteBook = await prismaClient.favoriteBooks.create({
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

        return favoriteBook;
    }
}

export { CreateFavoriteBooksService };