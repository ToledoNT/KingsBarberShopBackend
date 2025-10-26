"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelatorioModel = void 0;
class UpdateRelatorioModel {
    constructor(data) {
        this.mesAno = data.mesAno;
        this.agendamentos = data.agendamentos ?? 0;
        this.faturamento = data.faturamento ?? 0;
        this.cancelados = data.cancelados ?? 0;
        this.naoCompareceu = data.naoCompareceu ?? 0;
    }
    toPayload() {
        return {
            mesAno: this.mesAno,
            agendamentos: this.agendamentos,
            faturamento: this.faturamento,
            cancelados: this.cancelados,
            naoCompareceu: this.naoCompareceu,
        };
    }
}
exports.UpdateRelatorioModel = UpdateRelatorioModel;
