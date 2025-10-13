import { prisma } from "../prisma-connection";
import { ICreateAppointment } from "../../../interface/agendamentos/create-agendamento-interface";
import { IUpdateAppointment } from "../../../interface/agendamentos/update-agendamento-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";

export class PrismaAppointmentRepository {
  async create(data: ICreateAppointment): Promise<ResponseTemplateInterface> {
    try {
      const appointment = await prisma.agendamento.create({
        data: {
          nome: data.nome,
          telefone: data.telefone,
          email: data.email,
          data: data.data,
          hora: data.hora,
          servicoId: data.servico,       
          barbeiroId: data.profissional, 
          status: data.status || "Pendente",
        },
      });

      return new ResponseTemplateModel(true, 201, "Agendamento criado com sucesso", appointment);
    } catch (error: any) {
      console.error("Erro ao criar agendamento:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao criar agendamento", []);
    }
  }

  async update(data: IUpdateAppointment): Promise<ResponseTemplateInterface> {
    try {
      const updateData: any = {};
      if (data.nome !== undefined) updateData.nome = data.nome;
      if (data.telefone !== undefined) updateData.telefone = data.telefone;
      if (data.email !== undefined) updateData.email = data.email;
      if (data.data !== undefined) updateData.data = data.data;
      if (data.hora !== undefined) updateData.hora = data.hora;
      if (data.servico !== undefined) updateData.servicoId = data.servico;
      if (data.profissional !== undefined) updateData.barbeiroId = data.profissional;
      if (data.status !== undefined) updateData.status = data.status;

      const updatedAppointment = await prisma.agendamento.update({
        where: { id: data.id },
        data: updateData,
      });

      return new ResponseTemplateModel(true, 200, "Agendamento atualizado com sucesso", updatedAppointment);
    } catch (error: any) {
      console.error("Erro ao atualizar agendamento:", error);

      if (error.code === "P2025") {
        return new ResponseTemplateModel(false, 404, "Agendamento não encontrado para atualização", []);
      }

      return new ResponseTemplateModel(false, 500, "Erro interno ao atualizar agendamento", []);
    }
  }

  async deleteById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const appointmentExists = await prisma.agendamento.findUnique({ where: { id } });

      if (!appointmentExists) {
        return new ResponseTemplateModel(false, 404, "Agendamento não encontrado", []);
      }

      await prisma.agendamento.delete({ where: { id } });

      return new ResponseTemplateModel(true, 200, "Agendamento deletado com sucesso", []);
    } catch (error: any) {
      console.error("Erro ao deletar agendamento:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao deletar agendamento", []);
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const appointments = await prisma.agendamento.findMany({
        orderBy: [
          { data: "asc" },
          { hora: "asc" },
        ],
      });

      return new ResponseTemplateModel(true, 200, "Agendamentos recuperados com sucesso", appointments);
    } catch (error: any) {
      console.error("Erro ao recuperar agendamentos:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao recuperar agendamentos", []);
    }
  }
}