import type { Request, Response } from "express";
import { CreateProdutoUseCase } from "../../use-case/produtos/create-produto-use-case";
import { ICreateProduto } from "../../interface/produtos/create-produto-interface";

export class CreateProdutoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { nome, descricao, preco, quantidade, categoria } = req.body;

    // ============================
    // Validação de campos obrigatórios
    // ============================
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

    const useCase = new CreateProdutoUseCase();

    try {
      const agora = new Date().toISOString();

      const produto: ICreateProduto = {
        nome,
        descricao: descricao ?? "",
        preco: Number(preco),
        quantidade: Number(quantidade),
        categoria: categoria ?? undefined,
        ativo: true,
        criadoEm: agora,
        atualizadoEm: agora,
      };

      const result = await useCase.execute(produto);

       res.status(201).json({
        status: true,
        code: 201,
        message: "Produto criado com sucesso.",
        data: result,
      });
    } catch (error: any) {
      console.error("Erro ao criar produto:", error);

      res.status(500).json({
        status: false,
        code: 500,
        message: error.message || "Erro ao criar produto.",
        data: null,
      });
    }
  }
}