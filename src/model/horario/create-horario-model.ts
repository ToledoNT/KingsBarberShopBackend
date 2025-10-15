import { ICreateHorario } from "../../interface/horario/create-horario-interface";

export class CreateHorarioModel {
  profissionalId: string;
  data: Date;
  inicio: string;
  fim: string;
  disponivel: boolean;

  constructor(data: ICreateHorario) {
    this.profissionalId = data.profissionalId;
    this.data = data.data;
    this.inicio = data.inicio;
    this.fim = data.fim;
    this.disponivel = data.disponivel ?? false;
  }

  toPayload(): ICreateHorario {
    return {
      profissionalId: this.profissionalId,
      data: this.data,
      inicio: this.inicio,
      fim: this.fim,
      disponivel: this.disponivel,
    };
  }
}