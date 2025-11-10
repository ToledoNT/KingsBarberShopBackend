import type { Request, Response } from "express";
import { GetAllFinanceiroUseCase } from "../../use-case/financeiro/get-all-financeiro";
import { GetAllAppointmentsUseCase } from "../../use-case/agendamento/get-all-agendamento-use-case";

export class GetAllFinanceiroController {
  async handle(req: Request, res: Response): Promise<void> {
    const result = await new GetAllFinanceiroUseCase().execute();
    const financeiroList = result.data || [];

    const agendamentos = await new GetAllAppointmentsUseCase().execute();
    const pendentes = (agendamentos.data || []).filter(
      (a: any) => a.status === "Pendente"
    );

    const pendentesFormatados = pendentes.map((p: any) => ({
      id: p.id,
      agendamentoId: p.id,
      clienteNome: p.nome,
      valor: p.servicoPreco || 0,
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