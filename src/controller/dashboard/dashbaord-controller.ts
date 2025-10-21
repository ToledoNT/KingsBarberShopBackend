import type { Request, Response } from "express";
import { GetAllAppointmentsUseCase } from "../../use-case/agendamento/get-all-agendamento-use-case";
import { GetAllFinanceiroUseCase } from "../../use-case/financeiro/get-all-financeiro";
import { GetAllRelatorioUseCase } from "../../use-case/relatorio/get-all-relatorio-use-case";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { IAppointment } from "../../interface/agendamentos/create-agendamento-interface";
import { IFinance, IRelatorio } from "../../interface/relatorio/dashboard-interface";

export class GetDashboardMetricsController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await new GetAllAppointmentsUseCase().execute();
      const finance = await new GetAllFinanceiroUseCase().execute();
      const relatorios = await new GetAllRelatorioUseCase().execute();

      const agendamentos: IAppointment[] = appointments.data || [];
      const financeiro: IFinance[] = finance.data || [];
      const relatoriosData: IRelatorio[] = relatorios.data || [];

      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);
      const mesAtual = today.getMonth();
      const anoAtual = today.getFullYear();

      const agendamentosHoje = agendamentos.filter(a => 
        new Date(a.data).toISOString().slice(0, 10) === todayStr
      ).length;

      const agendamentosMes = agendamentos.filter(a => {
        const data = new Date(a.data);
        return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
      });

      const totalConcluidos = agendamentosMes.filter(a => a.status === "Concluído").length;
      const totalCancelados = agendamentosMes.filter(a => a.status === "Cancelado").length;
      const totalNaoCompareceu = agendamentosMes.filter(a => a.status === "Não Compareceu").length;
      const totalAgendados = agendamentosMes.filter(a => a.status === "Agendado").length;

      const faturamentoMensal = financeiro
        .filter(f => f.status === "Pago")
        .filter(f => {
          const data = new Date(f.criadoEm);
          return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
        })
        .reduce((acc, f) => acc + f.valor, 0);

      const ticketMedio = totalConcluidos > 0 ? faturamentoMensal / totalConcluidos : 0;

      const cancelamentosMensais = relatoriosData.reduce((acc, r) => acc + (r.cancelados || 0), 0);
      const naoCompareceuMensais = relatoriosData.reduce((acc, r) => acc + (r.naoCompareceu || 0), 0);

      const metrics = {
        agendamentosHoje,
        agendamentosMensais: agendamentosMes.length,
        faturamentoMensal,
        ticketMedio: parseFloat(ticketMedio.toFixed(2)),
        totalConcluidos,
        totalCancelados,
        totalNaoCompareceu,
        totalAgendados,
        cancelamentosMensais,
        naoCompareceuMensais,
      };

      const dashboardData = {
        metrics,
        agendamentos,
        financeiro,
        relatorios: relatoriosData,
      };

      console.log(dashboardData);

      res.status(200).json(
        new ResponseTemplateModel(
          true,
          200,
          "Dashboard metrics fetched successfully",
          dashboardData
        )
      );
    } catch (error: any) {
      console.error("Erro ao buscar métricas do dashboard:", error);
      res.status(500).json(
        new ResponseTemplateModel(
          false,
          500,
          `Erro interno ao buscar métricas do dashboard: ${error.message}`,
          null
        )
      );
    }
  }
}