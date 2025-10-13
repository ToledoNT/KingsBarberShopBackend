import { StatusAgendamento } from "./create-agendamento-interface";

export interface IUpdateAppointment {
  id: string; // obrigatório
  nome?: string;
  telefone?: string;
  email?: string;
  data?: string;
  hora?: string;
  servico?: string;
  profissional?: string; 
  status?: StatusAgendamento;
}