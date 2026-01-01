import { StatusAgendamento } from "../agendamentos/create-agendamento-interface";

export interface ICreateFinanceiro {
  id?: string;
  agendamentoId?: string;
  profissionalId?: string;
  profissionalNome?: string;
  clienteNome: string;
  valor: number;
  status?: StatusAgendamento;
  criadoEm?: Date;
  atualizadoEm?: Date;
}