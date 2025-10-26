"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProfessionalRepository = void 0;
const prisma_connection_1 = require("../prisma-connection");
const response_templete_model_1 = require("../../../model/response-templete-model");
class PrismaProfessionalRepository {
    async create(data) {
        try {
            const professional = await prisma_connection_1.prisma.profissional.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                    procedimentos: {
                        create: data.procedimentos?.map(p => ({
                            nome: p.nome,
                            valor: p.valor,
                        })) || [],
                    },
                },
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 201, "Profissional criado com sucesso", professional);
        }
        catch (error) {
            console.error("Erro ao criar profissional:", error);
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                return new response_templete_model_1.ResponseTemplateModel(false, 409, "E-mail já está em uso", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao criar profissional", []);
        }
    }
    async update(data) {
        try {
            const updateData = {};
            if (data.nome !== undefined)
                updateData.nome = data.nome;
            if (data.email !== undefined)
                updateData.email = data.email;
            if (data.telefone !== undefined)
                updateData.telefone = data.telefone;
            if (data.procedimentos !== undefined) {
                updateData.procedimentos = {
                    deleteMany: {},
                    create: data.procedimentos.map(p => ({
                        nome: p.nome,
                        valor: p.valor,
                    })),
                };
            }
            const updatedProfessional = await prisma_connection_1.prisma.profissional.update({
                where: { id: data.id },
                data: updateData,
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Profissional atualizado com sucesso", updatedProfessional);
        }
        catch (error) {
            console.error("Erro ao atualizar profissional:", error);
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                return new response_templete_model_1.ResponseTemplateModel(false, 409, "E-mail já está em uso", []);
            }
            if (error.code === "P2025") {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Profissional não encontrado para atualização", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao atualizar profissional", []);
        }
    }
    async deleteById(id) {
        try {
            const profissional = await prisma_connection_1.prisma.profissional.findUnique({
                where: { id },
                include: {
                    procedimentos: { include: { agendamentos: true } },
                    horariosDisponiveis: true,
                },
            });
            if (!profissional) {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Profissional não encontrado", []);
            }
            const procedimentosComAgendamento = profissional.procedimentos.filter((p) => p.agendamentos && p.agendamentos.length > 0);
            if (procedimentosComAgendamento.length > 0) {
                return new response_templete_model_1.ResponseTemplateModel(false, 400, "Não é possível deletar o profissional: existem agendamentos vinculados aos procedimentos", []);
            }
            await prisma_connection_1.prisma.horarioDisponivel.deleteMany({ where: { profissionalId: id } });
            await prisma_connection_1.prisma.procedimento.deleteMany({ where: { profissionalId: id } });
            await prisma_connection_1.prisma.profissional.delete({ where: { id } });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Profissional deletado com sucesso", []);
        }
        catch (error) {
            console.error("Erro ao deletar profissional:", error);
            if (error?.code === "P2025") {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Profissional não encontrado para exclusão", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao deletar profissional", []);
        }
    }
    async getAll() {
        try {
            const professionals = await prisma_connection_1.prisma.profissional.findMany({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true,
                    procedimentos: true,
                    criadoEm: true,
                    atualizadoEm: true,
                },
                orderBy: { criadoEm: "desc" },
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Profissionais recuperados com sucesso", professionals);
        }
        catch (error) {
            console.error("Erro ao recuperar profissionais:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao recuperar profissionais", []);
        }
    }
}
exports.PrismaProfessionalRepository = PrismaProfessionalRepository;
