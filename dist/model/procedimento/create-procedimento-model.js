"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcedimentoModel = void 0;
class CreateProcedimentoModel {
    constructor(data) {
        this.nome = data.nome;
        this.valor = data.valor;
        this.profissionalId = data.profissionalId;
    }
    toPayload() {
        return {
            nome: this.nome,
            valor: this.valor,
            profissionalId: this.profissionalId,
        };
    }
}
exports.CreateProcedimentoModel = CreateProcedimentoModel;
