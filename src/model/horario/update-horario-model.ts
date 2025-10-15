import { IUpdateHorario } from "../../interface/horario/update-horario";

export class UpdateHorarioModel {
  id: string;
  profissionalId?: string;
  data?: Date;
  inicio?: string;
  fim?: string;
  disponivel?: boolean;

  constructor(data: IUpdateHorario) {
    this.id = data.id;
    this.profissionalId = data.profissionalId;
    this.data = data.data;
    this.inicio = data.inicio;
    this.fim = data.fim;
    this.disponivel = data.disponivel;
  }

  toPayload(): Partial<IUpdateHorario> {
    const payload: Partial<IUpdateHorario> = {};
    if (this.profissionalId) payload.profissionalId = this.profissionalId;
    if (this.data) payload.data = this.data;
    if (this.inicio) payload.inicio = this.inicio;
    if (this.fim) payload.fim = this.fim;
    if (this.disponivel !== undefined) payload.disponivel = this.disponivel;
    return payload;
  }
}