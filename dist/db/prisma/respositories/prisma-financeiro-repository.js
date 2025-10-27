"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFinanceiroRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaFinanceiroRepository {
    async create(financeiro) {
        try {
            const created = await prisma.financeiro.create({
                data: {
                    agendamentoId: financeiro.agendamentoId,
                    clienteNome: financeiro.clienteNome,
                    valor: financeiro.valor,
                    status: financeiro.status ?? "Pago",
                    criadoEm: financeiro.criadoEm ?? new Date(),
                    atualizadoEm: financeiro.atualizadoEm ?? new Date(),
                },
            });
            return {
                status: true,
                code: 201,
                message: "Lançamento financeiro criado com sucesso.",
                data: created,
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao criar lançamento financeiro.",
                data: [],
                error: err.message,
            };
        }
    }
    async getAll() {
        try {
            const allFinanceiro = await prisma.financeiro.findMany({
                orderBy: { criadoEm: "desc" },
            });
            return {
                status: true,
                code: 200,
                message: "Todos os lançamentos financeiros recuperados com sucesso.",
                data: allFinanceiro,
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao buscar lançamentos financeiros.",
                data: [],
                error: err.message,
            };
        }
    }
}
exports.PrismaFinanceiroRepository = PrismaFinanceiroRepository;
