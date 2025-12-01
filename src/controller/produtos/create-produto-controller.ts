import type { Request, Response } from "express";
import { CreateProdutoUseCase } from "../../use-case/produtos/create-produto-use-case";
import { ICreateProduto } from "../../interface/produtos/create-produto-interface";

export class CreateProdutoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { nome, descricao, preco, estoque, categoria } = req.body;
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

    if (estoque == null || isNaN(Number(estoque))) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'estoque' é obrigatório e deve ser numérico.",
        data: null,
      });
      return;
    }

    const useCase = new CreateProdutoUseCase();

    try {
      const agora = new Date().toISOString();
      const quantidade = Number(estoque);

      const produtosCriados = [];

      for (let i = 0; i < quantidade; i++) {
        const produto: ICreateProduto = {
          nome,
          descricao: descricao ?? "",
          preco: Number(preco),
          estoque: 1, // cada produto é individual
          categoria: categoria ?? undefined,
          ativo: true,
          criadoEm: agora,
          atualizadoEm: agora,
        };

        const novoProduto = await useCase.execute(produto);
        produtosCriados.push(novoProduto);
      }

      res.status(201).json({
        status: true,
        code: 201,
        message: `Produto(s) criado(s) com sucesso: ${quantidade} unidade(s).`,
        data: produtosCriados,
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