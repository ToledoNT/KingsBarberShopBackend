import type { Request, Response } from "express";
import { GetAllHorariosUseCase } from "../../use-case/horario/get-all-horario-use-case";

export class GetAllHorariosController {
  async handle(req: Request, res: Response): Promise<void> {
    const result = await new GetAllHorariosUseCase().execute();
    res.status(result.code).json(result);
  }
}