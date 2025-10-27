"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAppointmentRepository = void 0;
const prisma_connection_1 = require("../prisma-connection");
const response_templete_model_1 = require("../../../model/response-templete-model");
class PrismaAppointmentRepository {
    async create(data) {
        try {
            const servico = await prisma_connection_1.prisma.procedimento.findUnique({
                where: { id: data.servico },
            });
            const profissional = await prisma_connection_1.prisma.profissional.findUnique({
                where: { id: data.profissional },
            });
            if (!servico || !profissional) {
                return new response_templete_model_1.ResponseTemplateModel(false, 400, "Serviço ou profissional não encontrado", []);
            }
            const appointment = await prisma_connection_1.prisma.agendamento.create({
                data: {
                    nome: data.nome,
                    telefone: data.telefone,
                    email: data.email,
                    data: new Date(data.data),
                    inicio: data.inicio,
                    fim: data.fim,
                    servicoId: servico.id,
                    profissionalId: profissional.id,
                    status: data.status ? data.status : "Agendado",
                    servicoNome: servico.nome,
                    servicoPreco: servico.valor,
                    profissionalNome: profissional.nome,
                },
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 201, "Agendamento criado com sucesso", appointment);
        }
        catch (error) {
            console.error("Erro ao criar agendamento:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao criar agendamento", []);
        }
    }
    async update(data) {
        try {
            const updateData = {};
            if (data.nome !== undefined)
                updateData.nome = data.nome;
            if (data.telefone !== undefined)
                updateData.telefone = data.telefone;
            if (data.email !== undefined)
                updateData.email = data.email;
            if (data.data !== undefined)
                updateData.data = data.data;
            if (data.inicio !== undefined)
                updateData.inicio = data.inicio;
            if (data.fim !== undefined)
                updateData.fim = data.fim;
            if (data.servico !== undefined)
                updateData.servicoId = data.servico;
            if (data.profissional !== undefined)
                updateData.profissionalId = data.profissional;
            if (data.status !== undefined)
                updateData.status = data.status;
            const updatedAppointment = await prisma_connection_1.prisma.agendamento.update({
                where: { id: data.id },
                data: updateData,
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Agendamento atualizado com sucesso", updatedAppointment);
        }
        catch (error) {
            console.error("Erro ao atualizar agendamento:", error);
            if (error.code === "P2025") {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Agendamento não encontrado para atualização", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao atualizar agendamento", []);
        }
    }
    async deleteById(id) {
        try {
            const appointmentExists = await prisma_connection_1.prisma.agendamento.findUnique({ where: { id } });
            if (!appointmentExists) {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Agendamento não encontrado", []);
            }
            await prisma_connection_1.prisma.agendamento.delete({ where: { id } });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Agendamento deletado com sucesso", []);
        }
        catch (error) {
            console.error("Erro ao deletar agendamento:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao deletar agendamento", []);
        }
    }
    async getAll() {
        try {
            const appointments = await prisma_connection_1.prisma.agendamento.findMany({
                orderBy: [
                    { data: "asc" },
                    { inicio: "asc" },
                ],
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Agendamentos recuperados com sucesso", appointments);
        }
        catch (error) {
            console.error("Erro ao recuperar agendamentos:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao recuperar agendamentos", []);
        }
    }
    async findById(id) {
        try {
            const appointment = await prisma_connection_1.prisma.agendamento.findUnique({
                where: { id },
                include: {
                    profissional: true,
                    servico: true,
                },
            });
            if (!appointment) {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Agendamento não encontrado", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Agendamento encontrado com sucesso", appointment);
        }
        catch (error) {
            console.error("Erro ao buscar agendamento por ID:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao buscar agendamento", []);
        }
    }
}
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
