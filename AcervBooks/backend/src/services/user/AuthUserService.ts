import prismaClient from '../../prisma';
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    registration: string;
    password: string;
}

class AuthUserService {
    async execute({ registration, password }: AuthRequest) {

        // Verificar se a matrícula existe.
        const user = await prismaClient.user.findFirst({
            where: {
                registration: registration
            }
        });

        if (!user) {
            throw new Error("User/password incorrect");
        }

        // Verificar se a senha está correta.
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/password incorrect");
        }

        // geração de token JWT e devolver os dados do usuário 
        // id, name, email, registration, address, phone, genery
        const token = sign({
            name: user.name,
            email: user.email,
            registration: user.registration,
            address: user.address,
            phone: user.phone,
            genery: user.genery
        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            registration: user.registration,
            address: user.address,
            phone: user.phone,
            genery: user.genery,
            token: token
        };
    }
}

export { AuthUserService }