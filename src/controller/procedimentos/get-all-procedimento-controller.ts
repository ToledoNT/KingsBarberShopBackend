import type { Request, Response } from "express";
import { GetAllProcedimentosUseCase } from "../../use-case/procedimento/get-all-procedimentos";

export class GetAllProcedimentosController {
  async handle(req: Request, res: Response): Promise<void> {
    const allProcedimentosResult = await new GetAllProcedimentosUseCase().execute();

    res.status(allProcedimentosResult.code).json(allProcedimentosResult);
  }
}