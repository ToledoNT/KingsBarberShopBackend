import type { Request, Response } from "express";
import { StatusAgendamento } from "../../interface/agendamentos/create-agendamento-interface";
import { UpdateAppointmentUseCase } from "../../use-case/agendamento/update-agendamento-use-case";

export class UpdateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id, status } = req.body;

    if (!id || !status) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Campos obrigatórios faltando: ${!id ? "id" : ""} ${!status ? "status" : ""}`.trim(),
        data: [],
      });
      return;
    }

    const useCase = new UpdateAppointmentUseCase();
    const updatedAppointment = await useCase.execute({ id, status });

    // Lógica específica para cada status
if (status === StatusAgendamento.CANCELADO) {
  //Liberar Horario 
  
  // Pode salvar em uma tabela/histórico de cancelamentos
  console.log("Agendamento cancelado, registrar no histórico.");
}



if (status === StatusAgendamento.NAO_COMPARECEU) {
  // Cliente não apareceu
  // Pode salvar no histórico, bloquear agendamentos futuros ou aplicar multa
  console.log("Cliente não compareceu, registrar e controlar.");
}

if (status === StatusAgendamento.CONCLUIDO) {
  // Cliente finalizou o serviço
  // Aqui você contabiliza o valor do corte/procedimento
  console.log("Agendamento concluído, contabilizar valor recebido.");
}
  }}

// const useCase = new UpdateAppointmentUseCase();
// const updatedAppointment = await useCase.execute({ id, status });

//CRIAR LOGS E FINANCEIRO PRA COMEÇAR FAZER OS CALCULOS