import prismaClient from "../../prisma";

interface ListBookRequest {
    perPage: number;
    offset: number;
}

class ListBookService{
    async execute({ perPage, offset }: ListBookRequest){
        const listBooks = await prismaClient.book.findMany({
            take:perPage,
            skip:offset
        });

        return listBooks;
    }   
}

export { ListBookService }