"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoModel = void 0;
const create_agendamento_interface_1 = require("../../interface/agendamentos/create-agendamento-interface");
class AgendamentoModel {
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.telefone = data.telefone;
        this.email = data.email;
        this.data = data.data ? new Date(data.data) : new Date();
        this.hora = data.hora ?? "";
        this.inicio = data.inicio ?? "";
        this.fim = data.fim ?? "";
        this.servicoId = data.servicoId ?? data.servico ?? "";
        this.servicoNome = data.servico?.nome ?? data.servicoNome;
        this.servicoValor = data.servico?.valor ?? data.servicoValor;
        this.profissionalId = data.profissionalId ?? data.barbeiro ?? "";
        this.profissionalNome = data.profissional?.nome ?? data.profissionalNome;
        this.status = data.status ? data.status : create_agendamento_interface_1.StatusAgendamento.AGENDADO;
        this.criadoEm = data.criadoEm ?? new Date();
        this.atualizadoEm = data.atualizadoEm ?? new Date();
    }
    toPayload() {
        return {
            id: this.id,
            nome: this.nome,
            telefone: this.telefone,
            email: this.email,
            data: this.data,
            hora: this.hora,
            inicio: this.inicio,
            fim: this.fim,
            servicoId: this.servicoId,
            servicoNome: this.servicoNome,
            servicoValor: this.servicoValor,
            profissionalId: this.profissionalId,
            profissionalNome: this.profissionalNome,
            status: this.status,
            criadoEm: this.criadoEm,
            atualizadoEm: this.atualizadoEm,
        };
    }
}
exports.AgendamentoModel = AgendamentoModel;
