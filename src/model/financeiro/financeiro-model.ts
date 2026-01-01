import { StatusAgendamento } from "../../interface/agendamentos/create-agendamento-interface";

export class FinanceiroModel {
  id?: string;
  agendamentoId?: string;

  profissionalId?: string;
  profissionalNome?: string;

  clienteNome: string;
  valor: number;
  status: StatusAgendamento;

  criadoEm: Date;
  atualizadoEm: Date;

  agendamentoNome?: string;

  constructor(
    data: Partial<FinanceiroModel> & {
      agendamento?: any;
      profissional?: any;
    }
  ) {
    this.id = data.id;
    this.agendamentoId = data.agendamentoId ?? undefined;

    this.profissionalId = data.profissionalId;
    this.profissionalNome =
      data.profissional?.nome ?? data.profissionalNome;

    this.clienteNome = data.clienteNome ?? "";
    this.valor = data.valor ?? 0;
    this.status = data.status ?? StatusAgendamento.AGENDADO;

    this.agendamentoNome = data.agendamento?.nome ?? data.agendamentoNome;

    this.criadoEm = data.criadoEm ?? new Date();
    this.atualizadoEm = data.atualizadoEm ?? new Date();
  }

  toPayload() {
    return {
      id: this.id,
      agendamentoId: this.agendamentoId,

      profissionalId: this.profissionalId,
      profissionalNome: this.profissionalNome,

      clienteNome: this.clienteNome,
      valor: this.valor,
      status: this.status,

      agendamentoNome: this.agendamentoNome,

      criadoEm: this.criadoEm,
      atualizadoEm: this.atualizadoEm,
    };
  }
}