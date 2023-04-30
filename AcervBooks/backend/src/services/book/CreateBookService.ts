import prismaClient from "../../prisma";

interface BookRequest {
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

class CreateBookService {
    async execute({ image, title, synops, genre, year, volume, edition, language, author, publisher}: BookRequest) {

        const book = await prismaClient.book.create({
            data:{
                image: image,
                title: title,
                synops: synops,
                genre: genre,
                year: year,
                volume: volume,
                edition: edition,
                language: language,
                author: author,
                publisher: publisher
            }
        });
        return book;
    }
}

export { CreateBookService } 