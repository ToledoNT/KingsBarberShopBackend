import { IUpdateProcedimento } from "../../interface/procedimento/update-procedimento-interface";

export class UpdateProcedimentoModel {
  id: string;
  nome: string;
  preco: number;
  profissionalId?: string;

  constructor(data: IUpdateProcedimento) {
    this.id = data.id;
    this.nome = data.nome;
    this.preco = data.valor;
    this.profissionalId = data.profissionalId;
  }

  toPayload(): IUpdateProcedimento {
    return {
      id: this.id,
      nome: this.nome,
      valor: this.preco,
      profissionalId: this.profissionalId,
    };
  }
}