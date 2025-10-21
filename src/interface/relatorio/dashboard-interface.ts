export interface IAppointment {
  data: string | Date;
  status: "Concluído" | "Cancelado" | "Não Compareceu" | "Agendado" | string;
}

export interface IFinance {
  valor: number;
  status: "Pago" | "Pendente" | string;
  criadoEm: string | Date;
}

export interface IRelatorio {
  cancelados?: number;
  naoCompareceu?: number;
}