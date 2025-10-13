import { prisma } from "../prisma-connection";
import { ICreateProfessional } from "../../../interface/profissional/create-profissional";
import { IUpdateProfessional } from "../../../interface/profissional/update-profissional-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";

export class PrismaProfessionalRepository {
async create(data: ICreateProfessional): Promise<ResponseTemplateInterface> {
  try {
    const professional = await prisma.profissional.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        procedimentos: {
          create: data.procedimentos?.map(p => ({
            nome: p.nome,
            preco: p.valor  
          })) || [],
        },
      },
    });

    return new ResponseTemplateModel(true, 201, "Profissional criado com sucesso", professional);
  } catch (error: any) {
    console.error("Erro ao criar profissional:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return new ResponseTemplateModel(false, 409, "E-mail já está em uso", []);
    }

    return new ResponseTemplateModel(false, 500, "Erro interno ao criar profissional", []);
  }
}
  async update(data: IUpdateProfessional): Promise<ResponseTemplateInterface> {
    try {
      const updateData: any = {};
      if (data.nome !== undefined) updateData.nome = data.nome;
      if (data.email !== undefined) updateData.email = data.email;
      if (data.telefone !== undefined) updateData.telefone = data.telefone;

      if (data.procedimentos !== undefined) {
        updateData.procedimentos = {
          deleteMany: {},
          create: data.procedimentos.map(p => ({
            nome: p.nome,
            valor: p.valor
          })),
        };
      }

      const updatedProfessional = await prisma.profissional.update({
        where: { id: data.id },
        data: updateData,
      });

      return new ResponseTemplateModel(true, 200, "Profissional atualizado com sucesso", updatedProfessional);
    } catch (error: any) {
      console.error("Erro ao atualizar profissional:", error);

      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return new ResponseTemplateModel(false, 409, "E-mail já está em uso", []);
      }

      if (error.code === "P2025") {
        return new ResponseTemplateModel(false, 404, "Profissional não encontrado para atualização", []);
      }

      return new ResponseTemplateModel(false, 500, "Erro interno ao atualizar profissional", []);
    }
  }

  async deleteById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const professionalExists = await prisma.profissional.findUnique({ where: { id } });

      if (!professionalExists) {
        return new ResponseTemplateModel(false, 404, "Profissional não encontrado", []);
      }

      await prisma.profissional.delete({ where: { id } });

      return new ResponseTemplateModel(true, 200, "Profissional deletado com sucesso", []);
    } catch (error: any) {
      console.error("Erro ao deletar profissional:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao deletar profissional", []);
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const professionals = await prisma.profissional.findMany({
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

      return new ResponseTemplateModel(true, 200, "Profissionais recuperados com sucesso", professionals);
    } catch (error: any) {
      console.error("Erro ao recuperar profissionais:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao recuperar profissionais", []);
    }
  }
}