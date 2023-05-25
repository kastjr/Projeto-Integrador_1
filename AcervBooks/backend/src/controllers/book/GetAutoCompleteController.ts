import { Request, Response } from "express";
import { GetAutoCompleteService } from "../../services/book/GetAutoCompleteService";

class GetAutoCompleteController{
    async handle(req: Request, res: Response) {
        const getAutoCompleteService = new GetAutoCompleteService();

        const titles = await getAutoCompleteService.execute();

        return res.json(titles);
    }
}

export { GetAutoCompleteController }