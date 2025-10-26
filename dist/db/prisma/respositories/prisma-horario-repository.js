"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaHorarioRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaHorarioRepository {
    async create(horario) {
        try {
            const created = await prisma.horarioDisponivel.create({
                data: {
                    data: horario.data,
                    inicio: horario.inicio,
                    fim: horario.fim,
                    disponivel: horario.disponivel ?? false,
                    profissional: { connect: { id: horario.profissionalId } },
                },
                include: { profissional: true },
            });
            return { status: true, code: 201, message: "Horário disponível criado com sucesso.", data: created };
        }
        catch (err) {
            console.error("Erro ao criar horário:", err.message);
            return { status: false, code: 500, message: "Erro ao criar horário disponível.", data: [], error: err.message };
        }
    }
    async update(id, horario) {
        try {
            const dataToUpdate = {};
            if (horario.data)
                dataToUpdate.data = horario.data;
            if (horario.inicio)
                dataToUpdate.inicio = horario.inicio;
            if (horario.fim)
                dataToUpdate.fim = horario.fim;
            if (horario.disponivel !== undefined)
                dataToUpdate.disponivel = horario.disponivel;
            if (horario.profissionalId)
                dataToUpdate.profissional = { connect: { id: horario.profissionalId } };
            const updated = await prisma.horarioDisponivel.update({
                where: { id },
                data: dataToUpdate,
                include: { profissional: true },
            });
            return { status: true, code: 200, message: "Horário disponível atualizado com sucesso.", data: updated };
        }
        catch (err) {
            console.error("Erro ao atualizar horário:", err.message);
            return { status: false, code: 500, message: "Erro ao atualizar horário disponível.", data: [], error: err.message };
        }
    }
    async delete(id) {
        try {
            await prisma.horarioDisponivel.delete({ where: { id } });
            return { status: true, code: 200, message: "Horário disponível removido com sucesso.", data: [] };
        }
        catch (err) {
            console.error("Erro ao remover horário:", err.message);
            return { status: false, code: 500, message: "Erro ao remover horário disponível.", data: [], error: err.message };
        }
    }
    async getAll() {
        try {
            const horarios = await prisma.horarioDisponivel.findMany({
                include: { profissional: true },
                orderBy: { data: "asc" },
            });
            const formatted = horarios.map(h => ({ ...h, data: h.data.toISOString().split("T")[0] }));
            return { status: true, code: 200, message: "Horários disponíveis carregados com sucesso.", data: formatted };
        }
        catch (err) {
            console.error("Erro ao buscar horários:", err.message);
            return { status: false, code: 500, message: "Erro ao buscar horários disponíveis.", data: [], error: err.message };
        }
    }
    async getByBarbeiro(profissionalId) {
        try {
            const horarios = await prisma.horarioDisponivel.findMany({
                where: { profissionalId },
                include: { profissional: true },
                orderBy: { data: "asc" },
            });
            const formatted = horarios.map(h => ({ ...h, data: h.data.toISOString().split("T")[0] }));
            return {
                status: true,
                code: 200,
                message: `Horários do profissional ${profissionalId} carregados com sucesso.`,
                data: formatted,
            };
        }
        catch (err) {
            console.error("Erro ao buscar horários do profissional:", err.message);
            return { status: false, code: 500, message: "Erro ao buscar horários do profissional.", data: [], error: err.message };
        }
    }
    async findById(id) {
        try {
            const horario = await prisma.horarioDisponivel.findUnique({
                where: { id },
                include: { profissional: true },
            });
            if (!horario)
                return { status: false, code: 404, message: "Horário não encontrado.", data: [] };
            return { status: true, code: 200, message: "Horário encontrado com sucesso.", data: horario };
        }
        catch (err) {
            console.error("Erro ao buscar horário por ID:", err.message);
            return { status: false, code: 500, message: "Erro ao buscar horário por ID.", data: [], error: err.message };
        }
    }
}
exports.PrismaHorarioRepository = PrismaHorarioRepository;
