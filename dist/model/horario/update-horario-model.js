"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHorarioModel = void 0;
class UpdateHorarioModel {
    constructor(data) {
        this.profissionalId = data.profissionalId;
        this.data = data.data;
        this.inicio = data.inicio;
        this.fim = data.fim;
        this.disponivel = data.disponivel;
    }
    toPayload() {
        const payload = {};
        if (this.profissionalId)
            payload.profissionalId = this.profissionalId;
        if (this.data)
            payload.data = this.data;
        if (this.inicio)
            payload.inicio = this.inicio;
        if (this.fim)
            payload.fim = this.fim;
        if (this.disponivel !== undefined)
            payload.disponivel = this.disponivel;
        return payload;
    }
}
exports.UpdateHorarioModel = UpdateHorarioModel;
