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
      const mesAtual = today.getMonth();
      const anoAtual = today.getFullYear();
      const todayStr = today.toISOString().slice(0, 10);

      // ---------- MÉTRICAS DIÁRIAS ----------
      const agendamentosHoje = agendamentos.filter(a => new Date(a.data).toISOString().slice(0, 10) === todayStr);
      const concluidosHoje = agendamentosHoje.filter(a => a.status === "Concluído");
      const faturamentoHoje = financeiro
        .filter(f => f.status === "Pago")
        .filter(f => new Date(f.criadoEm).toISOString().slice(0, 10) === todayStr)
        .reduce((acc, f) => acc + f.valor, 0);
      const taxaConclusaoHoje = agendamentosHoje.length
        ? (concluidosHoje.length / agendamentosHoje.length) * 100
        : 0;
      // ---------- MÉTRICAS MENSAIS ----------
      const relatoriosMesAtual = relatoriosData
        .filter(r => {
          const rDate = new Date(r.mesAno);
          return rDate.getFullYear() === anoAtual && rDate.getMonth() === mesAtual;
        })
        .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());

      const ultimoRelatorioMes = relatoriosMesAtual[0] || {
        faturamento: 0,
        agendamentos: 0,
        cancelados: 0,
        naoCompareceu: 0,
      };

      const faturamentoMensal = ultimoRelatorioMes.faturamento || 0;
      const totalAgendamentosMes = ultimoRelatorioMes.agendamentos || 0;
      const totalCanceladosMes = ultimoRelatorioMes.cancelados || 0;
      const totalNaoCompareceuMes = ultimoRelatorioMes.naoCompareceu || 0;
      const totalConcluidosMes = totalAgendamentosMes - totalCanceladosMes - totalNaoCompareceuMes;

      const ticketMedioMensal = totalConcluidosMes > 0 ? faturamentoMensal / totalConcluidosMes : 0;
      const taxaSucessoMensal = totalAgendamentosMes > 0 ? (totalConcluidosMes / totalAgendamentosMes) * 100 : 0;
      const taxaCancelamentoMensal = totalAgendamentosMes > 0 ? (totalCanceladosMes / totalAgendamentosMes) * 100 : 0;
      const taxaNaoCompareceuMensal = totalAgendamentosMes > 0 ? (totalNaoCompareceuMes / totalAgendamentosMes) * 100 : 0;

      // ---------- MÉTRICAS ANUAIS ----------
      const relatoriosAnoAtual = relatoriosData.filter(r => new Date(r.mesAno).getFullYear() === anoAtual);
      const faturamentoAnual = relatoriosAnoAtual.reduce((acc, r) => acc + (r.faturamento || 0), 0);
      const totalAgendamentosAno = relatoriosAnoAtual.reduce((acc, r) => acc + (r.agendamentos || 0), 0);
      const totalCanceladosAno = relatoriosAnoAtual.reduce((acc, r) => acc + (r.cancelados || 0), 0);
      const totalNaoCompareceuAno = relatoriosAnoAtual.reduce((acc, r) => acc + (r.naoCompareceu || 0), 0);
      const totalConcluidosAno = totalAgendamentosAno - totalCanceladosAno - totalNaoCompareceuAno;
      const mediaMensalAnual = parseFloat((faturamentoAnual / 12).toFixed(2));

      // ---------- MONTA OBJETO FINAL ----------
      const metrics = {
        diario: {
          agendamentosHoje: agendamentosHoje.length,
          concluidosHoje: concluidosHoje.length,
          faturamentoHoje,
          taxaConclusaoHoje: parseFloat(taxaConclusaoHoje.toFixed(1)),
        },
        mensal: {
          agendamentosMes: totalAgendamentosMes,
          faturamentoMensal,
          ticketMedio: parseFloat(ticketMedioMensal.toFixed(2)),
          taxaSucesso: parseFloat(taxaSucessoMensal.toFixed(1)),
          taxaCancelamento: parseFloat(taxaCancelamentoMensal.toFixed(1)),
          taxaNaoCompareceu: parseFloat(taxaNaoCompareceuMensal.toFixed(1)),
          totalConcluidos: totalConcluidosMes,
          totalCancelados: totalCanceladosMes,
          totalNaoCompareceu: totalNaoCompareceuMes,
          relatorioMes: ultimoRelatorioMes
        },
        anual: {
          agendamentosAno: totalAgendamentosAno,
          faturamentoAnual,
          totalConcluidos: totalConcluidosAno,
          totalCancelados: totalCanceladosAno,
          totalNaoCompareceu: totalNaoCompareceuAno,
          mediaMensalAnual
        }
      };

      const dashboardData = {
        metrics,
        agendamentos,
        financeiro,
        relatorios: relatoriosData,
      };

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