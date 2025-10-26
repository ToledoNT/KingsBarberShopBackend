"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessionalModel = void 0;
class CreateProfessionalModel {
    constructor(data) {
        this.nome = data.nome;
        this.email = data.email;
        this.telefone = data.telefone;
        this.procedimentos = data.procedimentos || [];
    }
    toPayload() {
        return {
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            procedimentos: this.procedimentos,
        };
    }
}
exports.CreateProfessionalModel = CreateProfessionalModel;
