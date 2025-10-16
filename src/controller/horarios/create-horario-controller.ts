import type { Request, Response } from "express";
import { ICreateHorario } from "../../interface/horario/create-horario-interface";
import { CreateHorarioUseCase } from "../../use-case/horario/create-horario-use-case";

export class CreateHorarioController {
  async handle(req: Request, res: Response): Promise<void> {
    const { profissional, data } = req.body;

    if (
      !profissional ||
      typeof profissional !== "object" ||
      !profissional.id ||
      typeof profissional.id !== "string" ||
      profissional.id.trim() === ""
    ) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'profissional.id' é obrigatório e deve ser uma string válida.",
        data: [],
      });
      return;
    }

    const dataValidada = new Date(data);
    if (isNaN(dataValidada.getTime())) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "A data fornecida é inválida.",
        data: [],
      });
      return;
    }

    const horariosParaCriar: ICreateHorario[] = [];
    const horaInicial = 7 * 60; 
    const horaFinal = 21 * 60;  
    const intervalo = 30;       

    for (let minutos = horaInicial; minutos < horaFinal; minutos += intervalo) {
      const inicioHoras = Math.floor(minutos / 60);
      const inicioMinutos = minutos % 60;
      const fimHoras = Math.floor((minutos + intervalo) / 60);
      const fimMinutos = (minutos + intervalo) % 60;

      const inicio = `${inicioHoras.toString().padStart(2, "0")}:${inicioMinutos.toString().padStart(2, "0")}`;
      const fim = `${fimHoras.toString().padStart(2, "0")}:${fimMinutos.toString().padStart(2, "0")}`;

      horariosParaCriar.push({
        profissionalId: profissional.id, 
        data: dataValidada,
        inicio,
        fim,
        disponivel: false,
      });
    }

    const resultados = [];
    const useCase = new CreateHorarioUseCase();

    for (const horario of horariosParaCriar) {
      try {
        const result = await useCase.execute(horario);
        resultados.push(result);
      } catch (err) {
        console.error("Erro ao criar horário:", err);
        res.status(500).json({
          status: false,
          code: 500,
          message: "Erro ao criar os horários.",
          data: [],
        });
        return;
      }
    }

    res.status(201).json({
      status: true,
      code: 201,
      message: "Horários gerados com sucesso.",
      data: resultados,
    });
  }
}