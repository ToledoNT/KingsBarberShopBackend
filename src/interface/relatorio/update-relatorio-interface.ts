export interface IUpdateRelatorio {
  mesAno: Date;
  agendamentos?: number;
  faturamento?: number;
  cancelados?: number;
  naoCompareceu?: number;
  vendidos?: number;
  consumidos?: number;
  pendentes?: number;
  disponiveis?: number; 
}