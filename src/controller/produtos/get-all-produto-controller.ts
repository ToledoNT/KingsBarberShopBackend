import type { Request, Response } from "express";
import { GetAllProdutosUseCase } from "../../use-case/produtos/get-all-produtos";

export class GetAllProdutosController {
  async handle(req: Request, res: Response): Promise<void> {
    const result = await new GetAllProdutosUseCase().execute();
    const produtos = result.data || [];
    res.status(200).json({
      status: true,
      code: 200,
      message: "Lista de produtos obtida com sucesso.",
      data: produtos,
    });
  }
}