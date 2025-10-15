import { PrismaClient } from "@prisma/client";
import { ICreateProcedimento } from "../../../interface/procedimento/create-procedimento-interface";
import { IUpdateProcedimento } from "../../../interface/procedimento/update-procedimento-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";

const prisma = new PrismaClient();

export class PrismaProcedimentoRepository {
  async create(procedimento: ICreateProcedimento): Promise<ResponseTemplateInterface> {
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
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao criar procedimento",
        data: [],
        error: err.message,
      };
    }
  }

  async update(id: string, procedimento: IUpdateProcedimento): Promise<ResponseTemplateInterface> {
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
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao atualizar procedimento",
        data: [],
        error: err.message,
      };
    }
  }
  async delete(id: string): Promise<ResponseTemplateInterface> {
    try {
      await prisma.procedimento.delete({ where: { id } });

      return {
        status: true,
        code: 200,
        message: "Procedimento removido com sucesso",
        data: [],
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao remover procedimento",
        data: [],
        error: err.message,
      };
    }
  }
  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const procedimentos = await prisma.procedimento.findMany();

      return {
        status: true,
        code: 200,
        message: "Procedimentos carregados com sucesso",
        data: procedimentos,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao buscar procedimentos",
        data: [],
        error: err.message,
      };
    }
  }

async findByProfissionalId(profissionalId: string): Promise<ResponseTemplateInterface> {
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
  } catch (err: any) {
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