import { PrismaClient } from "@prisma/client";
import { ICreateHorario } from "../../../interface/horario/create-horario-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";
import { IUpdateHorario } from "../../../interface/horario/update-horario";

const prisma = new PrismaClient();

export class PrismaHorarioRepository {
  async create(horario: ICreateHorario): Promise<ResponseTemplateInterface> {
    try {
      const created = await prisma.horarioDisponivel.create({
        data: {
          data: horario.data,
          inicio: horario.inicio,
          fim: horario.fim,
          disponivel: horario.disponivel ?? false,
          profissional: {
            connect: { id: horario.profissionalId }, 
          },
        },
        include: {
          profissional: true,
        },
      });

      return {
        status: true,
        code: 201,
        message: "Horário disponível criado com sucesso.",
        data: created,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao criar horário disponível.",
        data: [],
        error: err.message,
      };
    }
  }

async update(id: string, horario: IUpdateHorario): Promise<ResponseTemplateInterface> {
  try {
    // Monta o objeto apenas com os campos que vieram no payload
    const dataToUpdate: any = {};

    if (horario.data) dataToUpdate.data = horario.data;
    if (horario.inicio) dataToUpdate.inicio = horario.inicio;
    if (horario.fim) dataToUpdate.fim = horario.fim;
    if (horario.disponivel !== undefined) dataToUpdate.disponivel = horario.disponivel;
    if (horario.profissionalId) {
      dataToUpdate.profissional = {
        connect: { id: horario.profissionalId },
      };
    }

    const updated = await prisma.horarioDisponivel.update({
      where: { id },
      data: dataToUpdate,
      include: {
        profissional: true,
      },
    });

    return {
      status: true,
      code: 200,
      message: "Horário disponível atualizado com sucesso.",
      data: updated,
    };
  } catch (err: any) {
    return {
      status: false,
      code: 500,
      message: "Erro ao atualizar horário disponível.",
      data: [],
      error: err.message,
    };
  }
}

  async delete(id: string): Promise<ResponseTemplateInterface> {
    try {
      await prisma.horarioDisponivel.delete({ where: { id } });

      return {
        status: true,
        code: 200,
        message: "Horário disponível removido com sucesso.",
        data: [],
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao remover horário disponível.",
        data: [],
        error: err.message,
      };
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const horarios = await prisma.horarioDisponivel.findMany({
        include: { profissional: true },
        orderBy: { data: "asc" },
      });

      return {
        status: true,
        code: 200,
        message: "Horários disponíveis carregados com sucesso.",
        data: horarios,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao buscar horários disponíveis.",
        data: [],
        error: err.message,
      };
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
        data: horarios,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao buscar horários do profissional.",
        data: [],
        error: err.message,
      };
    }
  }
}