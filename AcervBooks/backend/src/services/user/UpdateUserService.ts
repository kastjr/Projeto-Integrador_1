import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    user_id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    genery: string;
}


class UpdateUserService {
    async execute({user_id, name, email, password, address, phone, genery}: UserRequest){

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.update({
            where:{
                id: user_id
            },
            data: {
                name: name,
                email:email,
                password:passwordHash,
                address: address,
                phone:phone,
                genery:genery
            },
            select:{
                id: true,
                name: true,
                email: true,
                registration: true,
                address: true,
                phone: true,
                genery: true,
                role: true
            }
        });

        return user;
    }
}

export { UpdateUserService }