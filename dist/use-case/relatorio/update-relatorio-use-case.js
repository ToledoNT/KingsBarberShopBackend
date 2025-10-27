"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelatorioUseCase = void 0;
const create_log_1 = require("../logs/create-log");
const prisma_relatorio_repositorio_1 = require("../../db/prisma/respositories/prisma-relatorio-repositorio");
const relatorio_model_1 = require("../../model/relatorio/relatorio-model");
class UpdateRelatorioUseCase {
    async execute(data) {
        const repository = new prisma_relatorio_repositorio_1.PrismaRelatorioRepository();
        try {
            const mesAnoNormalized = new Date(data.mesAno.getFullYear(), data.mesAno.getMonth(), 1, 0, 0, 0, 0);
            const existingReport = await repository.findByMesAno(mesAnoNormalized);
            let response;
            if (existingReport.status && existingReport.data) {
                const updatedData = {
                    mesAno: mesAnoNormalized,
                    agendamentos: data.agendamentos !== undefined
                        ? (existingReport.data.agendamentos ?? 0) + data.agendamentos
                        : existingReport.data.agendamentos ?? 0,
                    faturamento: data.faturamento !== undefined
                        ? (existingReport.data.faturamento ?? 0) + data.faturamento
                        : existingReport.data.faturamento ?? 0,
                    cancelados: data.cancelados !== undefined
                        ? (existingReport.data.cancelados ?? 0) + data.cancelados
                        : existingReport.data.cancelados ?? 0,
                    naoCompareceu: data.naoCompareceu !== undefined
                        ? (existingReport.data.naoCompareceu ?? 0) + data.naoCompareceu
                        : existingReport.data.naoCompareceu ?? 0,
                };
                const relatorioModel = new relatorio_model_1.UpdateRelatorioModel(updatedData);
                response = await repository.update(existingReport.data.id, relatorioModel.toPayload());
            }
            else {
                const newRelatorio = {
                    mesAno: mesAnoNormalized,
                    agendamentos: data.agendamentos ?? 0,
                    faturamento: data.faturamento ?? 0,
                    cancelados: data.cancelados ?? 0,
                    naoCompareceu: data.naoCompareceu ?? 0,
                };
                const relatorioModel = new relatorio_model_1.UpdateRelatorioModel(newRelatorio);
                response = await repository.create(relatorioModel.toPayload());
            }
            if (!response.status) {
                await new create_log_1.CreateLog().execute(response);
            }
            return response;
        }
        catch (err) {
            const logPayload = {
                status: false,
                code: 500,
                message: `Erro ao atualizar/criar relatório: ${err.message}`,
                data,
                error: err.message,
            };
            await new create_log_1.CreateLog().execute(logPayload);
            return {
                status: false,
                code: 500,
                message: "Erro ao atualizar/criar relatório",
                data: [],
                error: err.message,
            };
        }
    }
}
exports.UpdateRelatorioUseCase = UpdateRelatorioUseCase;
