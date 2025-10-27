"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardMetricsController = void 0;
const get_all_agendamento_use_case_1 = require("../../use-case/agendamento/get-all-agendamento-use-case");
const get_all_financeiro_1 = require("../../use-case/financeiro/get-all-financeiro");
const get_all_relatorio_use_case_1 = require("../../use-case/relatorio/get-all-relatorio-use-case");
const response_templete_model_1 = require("../../model/response-templete-model");
class GetDashboardMetricsController {
    async handle(req, res) {
        try {
            const appointments = await new get_all_agendamento_use_case_1.GetAllAppointmentsUseCase().execute();
            const finance = await new get_all_financeiro_1.GetAllFinanceiroUseCase().execute();
            const relatorios = await new get_all_relatorio_use_case_1.GetAllRelatorioUseCase().execute();
            const agendamentos = appointments.data || [];
            const financeiro = finance.data || [];
            const relatoriosData = relatorios.data || [];
            const today = new Date();
            const todayStr = today.toISOString().slice(0, 10);
            const mesAtual = today.getMonth();
            const anoAtual = today.getFullYear();
            const agendamentosHoje = agendamentos.filter(a => new Date(a.data).toISOString().slice(0, 10) === todayStr).length;
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
            res.status(200).json(new response_templete_model_1.ResponseTemplateModel(true, 200, "Dashboard metrics fetched successfully", dashboardData));
        }
        catch (error) {
            console.error("Erro ao buscar métricas do dashboard:", error);
            res.status(500).json(new response_templete_model_1.ResponseTemplateModel(false, 500, `Erro interno ao buscar métricas do dashboard: ${error.message}`, null));
        }
    }
}
exports.GetDashboardMetricsController = GetDashboardMetricsController;
