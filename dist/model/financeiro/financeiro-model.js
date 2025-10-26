"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceiroModel = void 0;
class FinanceiroModel {
    constructor(data) {
        this.id = data.id;
        this.agendamentoId = data.agendamentoId ?? "";
        this.clienteNome = data.clienteNome ?? "";
        this.valor = data.valor ?? 0;
        this.status = data.status ?? "Pago";
        this.agendamentoNome = data.agendamento?.nome ?? data.agendamentoNome;
        this.profissionalNome = data.profissional?.nome ?? data.profissionalNome;
        this.criadoEm = data.criadoEm ?? new Date();
        this.atualizadoEm = data.atualizadoEm ?? new Date();
    }
    toPayload() {
        return {
            id: this.id,
            agendamentoId: this.agendamentoId,
            clienteNome: this.clienteNome,
            valor: this.valor,
            status: this.status,
            agendamentoNome: this.agendamentoNome,
            profissionalNome: this.profissionalNome,
            criadoEm: this.criadoEm,
            atualizadoEm: this.atualizadoEm,
        };
    }
}
exports.FinanceiroModel = FinanceiroModel;
