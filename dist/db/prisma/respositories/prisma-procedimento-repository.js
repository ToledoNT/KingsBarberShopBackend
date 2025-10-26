"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProcedimentoRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaProcedimentoRepository {
    async create(procedimento) {
        try {
            const created = await prisma.procedimento.create({
                data: {
                    nome: procedimento.nome,
                    valor: procedimento.valor,
                    profissionalId: procedimento.profissionalId,
                },
            });
            return {
                status: true,
                code: 201,
                message: "Procedimento criado com sucesso",
                data: created,
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao criar procedimento",
                data: [],
                error: err.message,
            };
        }
    }
    async update(id, procedimento) {
        try {
            const updated = await prisma.procedimento.update({
                where: { id },
                data: {
                    nome: procedimento.nome,
                    valor: procedimento.valor,
                    profissionalId: procedimento.profissionalId,
                },
            });
            return {
                status: true,
                code: 200,
                message: "Procedimento atualizado com sucesso",
                data: updated,
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao atualizar procedimento",
                data: [],
                error: err.message,
            };
        }
    }
    async delete(id) {
        try {
            await prisma.procedimento.delete({ where: { id } });
            return {
                status: true,
                code: 200,
                message: "Procedimento removido com sucesso",
                data: [],
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao remover procedimento",
                data: [],
                error: err.message,
            };
        }
    }
    async getAll() {
        try {
            const procedimentos = await prisma.procedimento.findMany();
            return {
                status: true,
                code: 200,
                message: "Procedimentos carregados com sucesso",
                data: procedimentos,
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao buscar procedimentos",
                data: [],
                error: err.message,
            };
        }
    }
    async findByProfissionalId(profissionalId) {
        try {
            const procedimentos = await prisma.procedimento.findMany({
                where: { profissionalId },
            });
            return {
                status: true,
                code: 200,
                message: "Procedimentos carregados com sucesso",
                data: procedimentos,
            };
        }
        catch (err) {
            return {
                status: false,
                code: 500,
                message: "Erro ao buscar procedimentos",
                data: [],
                error: err.message,
            };
        }
    }
}
exports.PrismaProcedimentoRepository = PrismaProcedimentoRepository;
