import { IUpdateRelatorio } from "../../interface/relatorio/update-relatorio-interface";

export class UpdateRelatorioModel {
  mesAno: Date;
  agendamentos: number;
  faturamento: number;
  cancelados: number;
  naoCompareceu: number;

  vendidos?: number;
  consumidos?: number;
  pendentes?: number;
  disponiveis?: number; 

  constructor(data: Partial<IUpdateRelatorio> & { mesAno: Date }) {
    this.mesAno = data.mesAno;
    this.agendamentos = Math.floor(data.agendamentos ?? 0);
    this.faturamento = data.faturamento ?? 0; 
    this.cancelados = Math.floor(data.cancelados ?? 0);
    this.naoCompareceu = Math.floor(data.naoCompareceu ?? 0);

    this.vendidos = data.vendidos !== undefined ? Math.floor(data.vendidos) : undefined;
    this.consumidos = data.consumidos !== undefined ? Math.floor(data.consumidos) : undefined;
    this.pendentes = data.pendentes !== undefined ? Math.floor(data.pendentes) : undefined;
    this.disponiveis = data.disponiveis !== undefined ? Math.floor(data.disponiveis) : undefined; // ✅
  }

  toPayload(): IUpdateRelatorio {
    return {
      mesAno: this.mesAno,
      agendamentos: this.agendamentos,
      faturamento: this.faturamento,
      cancelados: this.cancelados,
      naoCompareceu: this.naoCompareceu,
      vendidos: this.vendidos,
      consumidos: this.consumidos,
      pendentes: this.pendentes,
      disponiveis: this.disponiveis, 
    };
  }
}