import type { Request, Response } from "express";
import { ICreateHorario } from "../../interface/horario/create-horario-interface";
import { CreateHorarioUseCase } from "../../use-case/horario/create-horario-use-case";

export class CreateHorarioIndividualController {
  async handle(req: Request, res: Response): Promise<void> {
    const { profissional, data, inicio, fim, disponivel } = req.body;

    if (!profissional?.id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'profissional.id' é obrigatório.",
        data: null,
      });
      return;
    }

    const useCase = new CreateHorarioUseCase();

    try {
      const horario: ICreateHorario = {
        profissionalId: profissional.id,
        data: new Date(data),
        inicio,
        fim,
        disponivel: disponivel ?? true,
      };

      const result = await useCase.execute(horario);

      res.status(201).json({
        status: true,
        code: 201,
        message: "Horário individual criado com sucesso.",
        data: result, 
      });
    } catch (error: any) {
      console.error("Erro ao criar horário individual:", error);
      res.status(500).json({
        status: false,
        code: 500,
        message: error.message || "Erro ao criar horário individual.",
        data: null,
      });
    }
  }
}