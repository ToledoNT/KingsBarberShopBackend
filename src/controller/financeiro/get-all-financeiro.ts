import type { Request, Response } from "express";
import { GetAllFinanceiroUseCase } from "../../use-case/financeiro/get-all-financeiro";

export class GetAllFinanceiroController {
  async handle(req: Request, res: Response): Promise<void> {
    const result = await new GetAllFinanceiroUseCase().execute();
    res.status(result.code).json(result);
  }
}