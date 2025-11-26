import type { Request, Response } from "express";
import { GetProdutoByIdUseCase } from "../../use-case/produtos/get-produto-by-id-controller";

export class GetProdutoByIdController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    // ============================
    // Validação
    // ============================
    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O ID do produto é obrigatório.",
        data: null,
      });
      return;
    }

    const useCase = new GetProdutoByIdUseCase();

    const result = await useCase.execute(id);

     res.status(result.code).json(result);
  }
}