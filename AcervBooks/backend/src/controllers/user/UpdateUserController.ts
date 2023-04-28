import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { name, email, password, address, phone, genery } = req.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
            user_id,
            name,
            email,
            password,
            address,
            phone,
            genery
        });

        return res.json(user);

    }
}

export { UpdateUserController }