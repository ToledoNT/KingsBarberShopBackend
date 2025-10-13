import { ICreateProcedimento } from "../../interface/procedimento/create-procedimento-interface";

export class CreateProcedimentoModel {
  nome: string;
  valor: number;
  profissionalId?: string;

  constructor(data: ICreateProcedimento) {
    this.nome = data.nome;
    this.valor = data.valor;
    this.profissionalId = data.profissionalId;
  }

  toPayload(): ICreateProcedimento {
    return {
      nome: this.nome,
      valor: this.valor,
      profissionalId: this.profissionalId,
    };
  }
}