import { ICreateProfessional } from "../../interface/profissional/create-profissional";

export class CreateProfessionalModel {
  nome: string;
  email: string;
  telefone: string;
  procedimentos: { id: string; nome: string; valor: number }[];

  constructor(data: ICreateProfessional) {
    this.nome = data.nome;
    this.email = data.email;
    this.telefone = data.telefone;
    this.procedimentos = data.procedimentos || [];
  }

  toPayload(): ICreateProfessional {
    return {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      procedimentos: this.procedimentos,
    };
  }
}