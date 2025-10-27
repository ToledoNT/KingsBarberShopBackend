"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHorarioModel = void 0;
class CreateHorarioModel {
    constructor(data) {
        this.profissionalId = data.profissionalId;
        this.data = data.data;
        this.inicio = data.inicio;
        this.fim = data.fim;
        this.disponivel = data.disponivel ?? false;
    }
    toPayload() {
        return {
            profissionalId: this.profissionalId,
            data: this.data,
            inicio: this.inicio,
            fim: this.fim,
            disponivel: this.disponivel,
        };
    }
}
exports.CreateHorarioModel = CreateHorarioModel;
