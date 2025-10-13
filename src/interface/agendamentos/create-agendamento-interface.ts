// interfaces/appointments/appointment-interface.ts

export enum StatusAgendamento {
  PENDENTE = "Pendente",
  CONCLUIDO = "Concluído",
  CANCELADO = "Cancelado",
}

export interface ICreateAppointment {
  nome: string;
  telefone: string;
  email: string;
  data: string; 
  hora: string;
  servico: string;
  profissional: string; 
  status?: StatusAgendamento;
}


export interface IAppointment extends ICreateAppointment {
  id: string;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface IHorarioDisponivel {
  id: string;
  profissionalId: string;
  data: string;
  inicio: string;
  fim: string;
}

export interface IBarbeiro {
  id: string;
  nome: string;
  horarios: IHorarioDisponivel[];
}