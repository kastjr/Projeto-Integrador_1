import prismaClient from "../../prisma";

interface BookRequest {
    book_id: string;
    image: string;
    title: string;
    synops: string;
    genre: string;
    year: number;
    volume: number;
    edition: string;
    language: string;
    author: string;
    publisher: string;
}


class UpdateBookService {
    async execute({ book_id, image, title, synops, genre, year, volume, edition, language, author, publisher}: BookRequest){
        const book = await prismaClient.book.update({
            where: {
                id: book_id
            },
            data: {
                image,
                title,
                synops,
                genre,
                year,
                volume,
                edition,
                language,
                author,
                publisher
            }
        });

        return book;
    }
}

export { UpdateBookService }