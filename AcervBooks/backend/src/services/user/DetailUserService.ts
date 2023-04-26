import prismaClient from "../../prisma";

interface DetailRequest {
    user_id: string;
}

class DetailUserService {
    async execute({ user_id }: DetailRequest) {
        const user = await prismaClient.user.findMany({
            where:{
                id: user_id
            },
            include: {
                booksSaved: {
                    include: {
                        book: true
                    }
                },
            },
        });

        return user;
    }
}

export { DetailUserService }