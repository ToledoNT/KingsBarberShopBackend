"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProcedimentoModel = void 0;
class UpdateProcedimentoModel {
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.preco = data.valor;
        this.profissionalId = data.profissionalId;
    }
    toPayload() {
        return {
            id: this.id,
            nome: this.nome,
            valor: this.preco,
            profissionalId: this.profissionalId,
        };
    }
}
exports.UpdateProcedimentoModel = UpdateProcedimentoModel;
