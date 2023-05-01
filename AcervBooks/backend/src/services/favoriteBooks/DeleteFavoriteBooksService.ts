import prismaClient from "../../prisma";

interface FavoriteBookRequest {
    favoriteBooks_id: string;
}

class DeleteFavoriteBooksService {
    async execute({ favoriteBooks_id }: FavoriteBookRequest) {
        const favoriteBook = await prismaClient.favoriteBooks.delete({
            where: {
                id: favoriteBooks_id
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

export { DeleteFavoriteBooksService };