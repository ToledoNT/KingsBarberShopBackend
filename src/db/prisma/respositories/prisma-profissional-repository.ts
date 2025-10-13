import { ResponseTemplateInterface } from "interface/response-template-interface.js";
import { prisma } from "../prisma-connection";
import { ResponseTemplateModel } from "model/response-templete-model.js";
import { ICreateProfessional } from "interface/profissional/create-profissional";
import { IUpdateProfessional } from "interface/profissional/update-profissional-interface";

export class PrismaProfessionalRepository {
  async create(data: ICreateProfessional): Promise<ResponseTemplateInterface> {
    try {
      const professional = await prisma.professional.create({
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          procedimentos: {
            create: data.procedimentos?.map(p => ({
              nome: p.nome,
              valor: p.valor
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

      const updatedProfessional = await prisma.professional.update({
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

  // ✅ Novo método de delete
  async deleteById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const professionalExists = await prisma.professional.findUnique({
        where: { id }
      });

      if (!professionalExists) {
        return new ResponseTemplateModel(false, 404, "Profissional não encontrado", []);
      }

      await prisma.professional.delete({
        where: { id }
      });

      return new ResponseTemplateModel(true, 200, "Profissional deletado com sucesso", []);
    } catch (error: any) {
      console.error("Erro ao deletar profissional:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao deletar profissional", []);
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
    const professionals = await prisma.professional.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        procedimentos: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return new ResponseTemplateModel(true, 200, "Profissionais recuperados com sucesso", professionals);
  } catch (error: any) {
    console.error("Erro ao recuperar profissionais:", error);
    return new ResponseTemplateModel(false, 500, "Erro interno ao recuperar profissionais", []);
  }
}
}