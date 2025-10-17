export interface ICreateFinanceiro {
  id?: string;
  agendamentoId: string;
  clienteNome: string;        
  valor: number;
  status?: "Pago";
  criadoEm?: Date;
  atualizadoEm?: Date;
}