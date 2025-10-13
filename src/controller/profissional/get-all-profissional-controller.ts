import type { Request, Response } from "express";
import { GetAllProfessionalsUseCase } from "../../use-case/profissional/get-all-profisssional-use-case";

export class GetAllProfessionalsController {
  async handle(req: Request, res: Response): Promise<void> {
    const professionals = await new GetAllProfessionalsUseCase().execute();
    res.status(professionals.code).json(professionals);
  }
}
