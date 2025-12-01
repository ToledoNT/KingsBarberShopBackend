import type { Request, Response } from "express";
import { GetAllFinanceiroUseCase } from "../../use-case/financeiro/get-all-financeiro";
import { GetAllProdutosUseCase } from "../../use-case/produtos/get-all-produtos";

export class GetAllFinanceiroController {
  async handle(req: Request, res: Response): Promise<void> {

    const result = await new GetAllFinanceiroUseCase().execute();
    const financeiroList = result.data || [];
    const produtosResult = await new GetAllProdutosUseCase().execute();
    const produtos = produtosResult.data || [];

    const pendentes = produtos.filter((p: any) => p.status === "pendente");
    const pendentesFormatados = pendentes.map((p: any) => ({
      id: p.id,
      produtoId: p.id,
      clienteNome: p.usuarioPendente || "Cliente não informado",
      valor: Number(p.preco) || 0,
      status: "Pendente",
      criadoEm: p.criadoEm,
      atualizadoEm: p.atualizadoEm,
    }));

 
    const financeiroComPendentes = [...financeiroList, ...pendentesFormatados];

    res.status(200).json({
      status: true,
      code: 200,
      message: "Lançamentos financeiros (Pagos e Pendentes) obtidos com sucesso.",
      data: financeiroComPendentes,
    });
  }
}