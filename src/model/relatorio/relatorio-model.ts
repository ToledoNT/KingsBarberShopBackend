import { IUpdateRelatorio } from "../../interface/relatorio/update-relatorio-interface";

export class UpdateRelatorioModel {
  mesAno: Date;           
  agendamentos: number;   
  faturamento: number;    
  cancelados: number;     
  naoCompareceu: number;  

  constructor(data: Partial<IUpdateRelatorio> & { mesAno: Date }) {
    // mesAno vem garantido pelo type acima
    this.mesAno = data.mesAno;
    this.agendamentos = data.agendamentos ?? 0;
    this.faturamento = data.faturamento ?? 0;
    this.cancelados = data.cancelados ?? 0;
    this.naoCompareceu = data.naoCompareceu ?? 0;
  }

  toPayload(): IUpdateRelatorio {
    return {
      mesAno: this.mesAno,
      agendamentos: this.agendamentos,
      faturamento: this.faturamento,
      cancelados: this.cancelados,
      naoCompareceu: this.naoCompareceu,
    };
  }
}