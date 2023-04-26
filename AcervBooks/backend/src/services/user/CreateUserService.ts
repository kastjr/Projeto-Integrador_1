import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    registration: string;
    address: string;
    phone: string;
    genery: string;
}

class CreateUserService {
    async execute({ name, email, password, registration, address, phone, genery }: UserRequest) {

        // verificar enviou um email

        if(!registration){
            throw new Error("Registration incorrect!");
        }

        // Verificar se a matrícula já está cadastrada

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                registration: registration
            }
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        // criptografar senha do usuário

        const passwordHash = await hash(password, 8);

        // Cria um usuário com o prismaClient

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                registration: registration,
                address: address,
                phone: phone,
                genery: genery,
            },
            select: {
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

export { CreateUserService }