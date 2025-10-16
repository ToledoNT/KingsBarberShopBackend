import { StatusAgendamento } from "../../interface/agendamentos/create-agendamento-interface";

export class UpdateAgendamentoModel {
  id: string;
  nome?: string;
  telefone?: string;
  email?: string;
  data?: Date;
  inicio?: string;
  fim?: string;
  servicoId?: string;
  servicoNome?: string;
  servicoValor?: number;
  profissionalId?: string;
  profissionalNome?: string;
  status?: StatusAgendamento;
  atualizadoEm?: Date;

  constructor(data: any) {
    if (!data.id) throw new Error("ID do agendamento é obrigatório para atualização");
    this.id = data.id;
    if (data.nome !== undefined) this.nome = data.nome;
    if (data.telefone !== undefined) this.telefone = data.telefone;
    if (data.email !== undefined) this.email = data.email;
    if (data.data !== undefined) this.data = new Date(data.data);
    if (data.inicio !== undefined) this.inicio = data.inicio;
    if (data.fim !== undefined) this.fim = data.fim;
    if (data.servico !== undefined) this.servicoId = data.servico;
    if (data.servicoNome !== undefined) this.servicoNome = data.servicoNome;
    if (data.servicoValor !== undefined) this.servicoValor = data.servicoValor;
    if (data.profissional !== undefined) this.profissionalId = data.profissional;
    if (data.profissionalNome !== undefined) this.profissionalNome = data.profissionalNome;
    if (data.status !== undefined) this.status = data.status;

    this.atualizadoEm = new Date();
  }

  toPayload() {
    return {
      id: this.id,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      data: this.data,
      inicio: this.inicio,
      fim: this.fim,
      servicoId: this.servicoId,
      servicoNome: this.servicoNome,
      servicoValor: this.servicoValor,
      profissionalId: this.profissionalId,
      profissionalNome: this.profissionalNome,
      status: this.status,
      atualizadoEm: this.atualizadoEm,
    };
  }
}
