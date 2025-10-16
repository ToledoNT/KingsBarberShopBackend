export interface HorarioDTO {
  id: string;
  inicio: string;
  fim: string;
  label: string;
  disponivel: boolean;
}

export interface ProcedimentoDTO {
  id: string;
  nome: string;
  valor: number;
  label: string;
}