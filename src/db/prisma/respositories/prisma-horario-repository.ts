import { PrismaClient, HorarioDisponivel } from "@prisma/client";
import { ICreateHorario } from "../../../interface/horario/create-horario-interface";
import { IUpdateHorario } from "../../../interface/horario/update-horario";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";

const prisma = new PrismaClient();

const formatHorario = (h: HorarioDisponivel) => ({
  ...h,
  data: h.data.toISOString().split("T")[0],
});

export class PrismaHorarioRepository {
  async create(horario: ICreateHorario): Promise<ResponseTemplateInterface> {
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
    } catch (err: any) {
      console.error("Erro ao criar horário:", err.message);
      return { status: false, code: 500, message: "Erro ao criar horário disponível.", data: [], error: err.message };
    }
  }

  async update(id: string, horario: IUpdateHorario): Promise<ResponseTemplateInterface> {
    try {
      const updated = await prisma.horarioDisponivel.update({
        where: { id },
        data: {
          data: horario.data,
          inicio: horario.inicio,
          fim: horario.fim,
          disponivel: horario.disponivel,
          profissional: horario.profissionalId ? { connect: { id: horario.profissionalId } } : undefined,
        },
        include: { profissional: true },
      });

      return { status: true, code: 200, message: "Horário disponível atualizado com sucesso.", data: updated };
    } catch (err: any) {
      console.error("Erro ao atualizar horário:", err.message);
      return { status: false, code: 500, message: "Erro ao atualizar horário disponível.", data: [], error: err.message };
    }
  }

  async delete(id: string): Promise<ResponseTemplateInterface> {
    try {
      await prisma.horarioDisponivel.delete({ where: { id } });
      return { status: true, code: 200, message: "Horário disponível removido com sucesso.", data: [] };
    } catch (err: any) {
      console.error("Erro ao remover horário:", err.message);
      return { status: false, code: 500, message: "Erro ao remover horário disponível.", data: [], error: err.message };
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const horarios = await prisma.horarioDisponivel.findMany({
        include: { profissional: true },
        orderBy: { data: "asc" },
      });

      return { status: true, code: 200, message: "Horários disponíveis carregados com sucesso.", data: horarios.map(formatHorario) };
    } catch (err: any) {
      console.error("Erro ao buscar horários:", err.message);
      return { status: false, code: 500, message: "Erro ao buscar horários disponíveis.", data: [], error: err.message };
    }
  }

  async getByBarbeiro(profissionalId: string): Promise<ResponseTemplateInterface> {
    try {
      const horarios = await prisma.horarioDisponivel.findMany({
        where: { profissionalId },
        include: { profissional: true },
        orderBy: { data: "asc" },
      });

      return {
        status: true,
        code: 200,
        message: `Horários do profissional ${profissionalId} carregados com sucesso.`,
        data: horarios.map(formatHorario),
      };
    } catch (err: any) {
      console.error("Erro ao buscar horários do profissional:", err.message);
      return { status: false, code: 500, message: "Erro ao buscar horários do profissional.", data: [], error: err.message };
    }
  }

  async findById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const horario = await prisma.horarioDisponivel.findUnique({
        where: { id },
        include: { profissional: true },
      });

      if (!horario) return { status: false, code: 404, message: "Horário não encontrado.", data: [] };

      return { status: true, code: 200, message: "Horário encontrado com sucesso.", data: formatHorario(horario) };
    } catch (err: any) {
      console.error("Erro ao buscar horário por ID:", err.message);
      return { status: false, code: 500, message: "Erro ao buscar horário por ID.", data: [], error: err.message };
    }
  }
}
