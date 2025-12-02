import type { Request, Response } from "express";
import { IUpdateProduto } from "../../interface/produtos/update-produto-interface";
import { UpdateProdutoUseCase } from "../../use-case/produtos/update-produto-use-case";
import { CreateFinanceiroUseCase } from "../../use-case/financeiro/create-financeiro-use-case";
import { UpdateRelatorioUseCase } from "../../use-case/relatorio/update-relatorio-use-case";
import { GetProdutoByIdUseCase } from "../../use-case/produtos/get-produto-by-id-controller";

export class UpdateProdutoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria, status, usuarioPendente } = req.body;

    if (!id) {
      res.status(400).json({ status: false, code: 400, message: "O ID do produto é obrigatório.", data: null });
      return;
    }

    if (!nome) {
      res.status(400).json({ status: false, code: 400, message: "O campo 'nome' é obrigatório.", data: null });
      return;
    }

    const statusValido = status as "disponivel" | "vendido" | "consumido" | "pendente" | undefined;
    if (!statusValido) {
      res.status(400).json({ status: false, code: 400, message: "Status inválido.", data: null });
      return;
    }

    // Buscar produto atual
    const getProdutoUseCase = new GetProdutoByIdUseCase();
    const produtoAtualResponse = await getProdutoUseCase.execute(id);
    const produtoAtual = produtoAtualResponse.data;

    if (!produtoAtual) {
      res.status(404).json({ status: false, code: 404, message: "Produto não encontrado.", data: null });
      return;
    }

    // Impede reverter status se já estiver vendido
    let statusParaAtualizar = statusValido;
    if (produtoAtual.status === "vendido") {
      statusParaAtualizar = "vendido";
    }

    // ============================================================
    // STATUS → PENDENTE (somar +1)
    // ============================================================
    if (statusParaAtualizar === "pendente" && produtoAtual.status !== "pendente") {
      try {
        const updateRelatorio = new UpdateRelatorioUseCase();

        await updateRelatorio.execute({
          mesAno: new Date(),
          pendentes: 1,
          vendidos: 0,
          faturamento: 0,
          consumidos: 0
        });

      } catch (err) {
        console.error("Erro ao processar pendência:", err);
        res.status(500).json({
          status: false,
          code: 500,
          message: "Erro ao processar status pendente.",
          data: null
        });
        return;
      }
    }

    // ============================================================
    // STATUS → VENDIDO
    // cria financeiro + relatório
    // ============================================================
    if (statusParaAtualizar === "vendido" && produtoAtual.status !== "vendido") {
      try {
        const financeiroUseCase = new CreateFinanceiroUseCase();

        await financeiroUseCase.execute({
          clienteNome: nome,
          valor: Number(preco) || 0
        });

        const estavaPendente = produtoAtual.status === "pendente";

        const updateRelatorio = new UpdateRelatorioUseCase();

        await updateRelatorio.execute({
          mesAno: new Date(),
          vendidos: 1,
          faturamento: Number(preco) || 0,
          pendentes: estavaPendente ? -1 : 0,
          consumidos: 0
        });

      } catch (err) {
        console.error("Erro ao processar venda:", err);
        res.status(500).json({
          status: false,
          code: 500,
          message: "Erro interno ao processar venda.",
          data: null
        });
        return;
      }
    }

    // ============================================================
    // NOVO: STATUS → CONSUMIDO
    // adiciona ao relatório sem faturamento
    // ============================================================
    if (statusParaAtualizar === "consumido" && produtoAtual.status !== "consumido") {
      try {
        const estavaPendente = produtoAtual.status === "pendente";

        const updateRelatorio = new UpdateRelatorioUseCase();

        await updateRelatorio.execute({
          mesAno: new Date(),
          consumidos: 1,
          vendidos: 0,
          faturamento: 0,
          pendentes: estavaPendente ? -1 : 0
        });

      } catch (err) {
        console.error("Erro ao processar consumo:", err);
        res.status(500).json({
          status: false,
          code: 500,
          message: "Erro interno ao processar consumo.",
          data: null
        });
        return;
      }
    }

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
      const updateUseCase = new UpdateProdutoUseCase();
      const result = await updateUseCase.execute(dataAtualizacao);
      res.status(result.code).json(result);
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      res.status(500).json({
        status: false,
        code: 500,
        message: "Erro interno ao atualizar produto.",
        data: null
      });
    }
  }
}