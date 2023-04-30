import prismaClient from "../../prisma";

interface DetailRequest {
    user_id: string;
}

class DetailUserService {
    async execute({ user_id }: DetailRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                registration: true,
                address: true,
                phone: true,
                genery: true,
                role: true,

                booksSaved: {
                    select: {
                        book: {
                            select: {
                                id: true,
                                image: true,
                                title: true,
                                synops: true,
                                genre: true,
                                year: true,
                                volume: true,
                                edition: true,
                                language: true,
                                author: true,
                                publisher: true
                            }
                        }
                    }
                },
            },
        });

        return user;
    }
}

export { DetailUserService }