import prismaClient from "../../prisma";

class GetAutoCompleteService{
    async execute(){
        const titles = await prismaClient.book.findMany({
            select: {
                title: true
            }
        });

        return titles;
    }
}

export { GetAutoCompleteService}