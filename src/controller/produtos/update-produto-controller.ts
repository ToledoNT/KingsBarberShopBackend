import type { Request, Response } from "express";
import { IUpdateProduto } from "../../interface/produtos/update-produto-interface";
import { UpdateProdutoUseCase } from "../../use-case/produtos/update-produto-use-case";

export class UpdateProdutoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade, categoria, ativo } = req.body;

    // ============================
    // Validações
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

    if (!nome) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'nome' é obrigatório.",
        data: null,
      });
      return;
    }

    if (preco == null || isNaN(Number(preco))) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'preco' é obrigatório e deve ser numérico.",
        data: null,
      });
      return;
    }

    if (quantidade == null || isNaN(Number(quantidade))) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'quantidade' é obrigatório e deve ser numérico.",
        data: null,
      });
      return;
    }

    const useCase = new UpdateProdutoUseCase();

    const data: IUpdateProduto = {
      id,
      nome,
      descricao: descricao ?? "",
      preco: Number(preco),
      quantidade: Number(quantidade),
      categoria: categoria ?? "",
      ativo: ativo ?? true,
      atualizadoEm: new Date().toISOString(),
    };

    // agora não dá erro (id está dentro do objeto!)
    const result = await useCase.execute(data);

    res.status(result.code).json(result);
  }
}
