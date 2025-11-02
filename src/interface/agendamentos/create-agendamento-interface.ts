export enum StatusAgendamento {
  AGENDADO = "Agendado",
  EM_ANDAMENTO = "Em Andamento",
  CONCLUIDO = "Concluído",
  CANCELADO = "Cancelado",
  NAO_COMPARECEU = "Não Compareceu",
  PENDENTE = "Pendente",
  PAGO = "Pago"
}

export interface ICreateAppointment {
  nome: string;
  telefone: string;
  email?: string;
  data: string;
  hora?: string;           
  servico: string;
  profissional: string;
  inicio?: string;        
  fim?: string;           
  status?: StatusAgendamento;
}

export interface IAppointment extends ICreateAppointment {
  id: string;
  criadoEm?: string;
  atualizadoEm?: string;
  servicoNome?: string;
  servicoValor?: number;
  profissionalNome?: string;
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