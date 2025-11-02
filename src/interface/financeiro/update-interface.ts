import { StatusAgendamento } from "../agendamentos/create-agendamento-interface";

export interface IUpdateFinanceiro {
  id: string; 
  agendamentoId?: string;
  clienteNome?: string;
  valor?: number;
  status?: StatusAgendamento;
  criadoEm?: Date;
  atualizadoEm?: Date;
}