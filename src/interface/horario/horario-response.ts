interface IHorario {
  id: string;
  inicio: string;
  fim: string;
  label: string;
  disponivel: boolean;
}

interface IProcedimento {
  id: string;
  nome: string;
  valor: number;
  label: string;
}

interface IDadosAgendamento {
  barbeiroId: string;
  horarios: IHorario[];
  procedimentos: IProcedimento[];
  totalHorarios: number;
  totalProcedimentos: number;
}