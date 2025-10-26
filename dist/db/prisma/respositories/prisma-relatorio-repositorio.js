"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRelatorioRepository = void 0;
const prisma_connection_1 = require("../prisma-connection");
const response_templete_model_1 = require("../../../model/response-templete-model");
const relatorio_model_1 = require("../../../model/relatorio/relatorio-model");
class PrismaRelatorioRepository {
    async create(data) {
        try {
            const relatorioModel = new relatorio_model_1.UpdateRelatorioModel(data);
            const relatorio = await prisma_connection_1.prisma.relatorio.create({
                data: relatorioModel.toPayload(),
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 201, "Relatório criado com sucesso", relatorio);
        }
        catch (error) {
            console.error("Erro ao criar relatório:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, `Erro interno ao criar relatório: ${error.message}`, []);
        }
    }
    async update(id, data) {
        try {
            if (!data.mesAno) {
                throw new Error("Campo mesAno é obrigatório ao atualizar o relatório");
            }
            const relatorioModel = new relatorio_model_1.UpdateRelatorioModel(data);
            const relatorio = await prisma_connection_1.prisma.relatorio.update({
                where: { id },
                data: relatorioModel.toPayload(),
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Relatório atualizado com sucesso", relatorio);
        }
        catch (error) {
            console.error("Erro ao atualizar relatório:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, `Erro interno ao atualizar relatório: ${error.message}`, []);
        }
    }
    async findByMesAno(mesAno) {
        try {
            const startOfMonth = new Date(mesAno.getFullYear(), mesAno.getMonth(), 1, 0, 0, 0, 0);
            const relatorio = await prisma_connection_1.prisma.relatorio.findFirst({
                where: {
                    mesAno: startOfMonth,
                },
            });
            if (relatorio) {
                return new response_templete_model_1.ResponseTemplateModel(true, 200, "Relatório encontrado", relatorio);
            }
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Relatório não existe", null);
        }
        catch (error) {
            console.error("Erro ao buscar relatório:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, `Erro ao buscar relatório: ${error.message}`, []);
        }
    }
    async getAll() {
        try {
            const relatorios = await prisma_connection_1.prisma.relatorio.findMany({
                orderBy: { mesAno: "desc" },
            });
            if (relatorios.length > 0) {
                return new response_templete_model_1.ResponseTemplateModel(true, 200, "Relatórios encontrados", relatorios);
            }
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Nenhum relatório encontrado", []);
        }
        catch (error) {
            console.error("Erro ao buscar todos os relatórios:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, `Erro interno ao buscar relatórios: ${error.message}`, []);
        }
    }
}
exports.PrismaRelatorioRepository = PrismaRelatorioRepository;
