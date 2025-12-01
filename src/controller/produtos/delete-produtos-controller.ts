import type { Request, Response } from "express";
import { DeleteProdutoUseCase } from "../../use-case/produtos/delete-produtos-use-case";
import { GetProdutoByIdUseCase } from "../../use-case/produtos/get-produto-by-id-controller";

export class DeleteProdutoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O ID do produto é obrigatório.",
        data: null,
      });
      return;
    }

    const getProduto = new GetProdutoByIdUseCase();
    const produto = await getProduto.execute(id);

    if (!produto || !produto.data) {
      res.status(404).json({
        status: false,
        code: 404,
        message: "Produto não encontrado.",
        data: null,
      });
      return;
    }

    if (produto.data.status === "pendente") {
      res.status(403).json({
        status: false,
        code: 403,
        message: "Não é permitido excluir produtos com status 'pendente'.",
        data: null,
      });
      return;
    }

    const useCase = new DeleteProdutoUseCase();
    const result = await useCase.execute(id);

    res.status(result.code).json(result);
  }
}