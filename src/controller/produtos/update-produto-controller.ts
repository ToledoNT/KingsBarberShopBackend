import type { Request, Response } from "express";
import { IUpdateProduto } from "../../interface/produtos/update-produto-interface";
import { UpdateProdutoUseCase } from "../../use-case/produtos/update-produto-use-case";
import { CreateFinanceiroUseCase } from "../../use-case/financeiro/create-financeiro-use-case";
import { ICreateFinanceiro } from "../../interface/financeiro/create-financeiro-interface";
import { UpdateRelatorioUseCase } from "../../use-case/relatorio/update-relatorio-use-case";
import { GetProdutoByIdUseCase } from "../../use-case/produtos/get-produto-by-id-controller";

export class UpdateProdutoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria, status, usuarioPendente } = req.body;

    // ============================
    // Validações básicas
    // ============================
    if (!id) {
      res.status(400).json({ status: false, code: 400, message: "O ID do produto é obrigatório.", data: null });
      return;
    }

    if (!nome) {
      res.status(400).json({ status: false, code: 400, message: "O campo 'nome' é obrigatório.", data: null });
      return;
    }

    // ============================
    // Valida status
    // ============================
    const statusValido = status as "disponivel" | "vendido" | "consumido" | "pendente" | undefined;

    if (!statusValido) {
      res.status(400).json({ status: false, code: 400, message: "Status inválido.", data: null });
      return;
    }

    // ============================
    // Busca o produto atual
    // ============================
    const getProdutoUseCase = new GetProdutoByIdUseCase();
    const produtoAtualResponse = await getProdutoUseCase.execute(id);
    const produtoAtual = produtoAtualResponse.data;

    // Bloqueia alteração de status se já estiver vendido
    let statusParaAtualizar = statusValido;
    if (produtoAtual?.status === "vendido" && statusValido !== "vendido") {
      statusParaAtualizar = "vendido";
    }

    // ============================
    // Lógica por STATUS
    // ============================
    if (statusParaAtualizar === "vendido" && produtoAtual?.status !== "vendido") {
      try {
        const financeiroUseCase = new CreateFinanceiroUseCase();
        const dataFinanceiro: ICreateFinanceiro = { clienteNome: nome, valor: Number(preco) || 0 };
        const retornoFinanceiro = await financeiroUseCase.execute(dataFinanceiro);

        if (!retornoFinanceiro) {
          res.status(500).json({ status: false, code: 500, message: "Erro ao criar lançamento financeiro.", data: null });
          return;
        }

        const addRelatorio = new UpdateRelatorioUseCase();
        const dataRelatorio = {
          mesAno: new Date(),
          vendidos: 1,
          faturamento: Number(preco) || 0,
        };
        await addRelatorio.execute(dataRelatorio);

      } catch (error) {
        console.error("Erro ao criar registro financeiro:", error);
        res.status(500).json({ status: false, code: 500, message: "Erro interno ao criar registro financeiro.", data: null });
        return;
      }
    }

    // ============================
    // Atualização do produto
    // ============================
    const dataAtualizacao: IUpdateProduto = {
      id,
      nome,
      descricao: descricao ?? "",
      preco: Number(preco) || 0,
      estoque: estoque !== undefined ? Number(estoque) : undefined,
      categoria: categoria ?? "",
      status: statusParaAtualizar,
      usuarioPendente: usuarioPendente ?? "",
      atualizadoEm: new Date(),
    };

    try {
      const useCase = new UpdateProdutoUseCase();
      const result = await useCase.execute(dataAtualizacao);
      res.status(result.code).json(result);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ status: false, code: 500, message: "Erro interno ao atualizar produto.", data: null });
    }
  }
}