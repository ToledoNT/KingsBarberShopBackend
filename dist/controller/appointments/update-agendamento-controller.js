"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentController = void 0;
const create_agendamento_interface_1 = require("../../interface/agendamentos/create-agendamento-interface");
const update_agendamento_use_case_1 = require("../../use-case/agendamento/update-agendamento-use-case");
const create_financeiro_use_case_1 = require("../../use-case/financeiro/create-financeiro-use-case");
const get_agendamento_by_id_use_case_1 = require("../../use-case/agendamento/get-agendamento-by-id-use-case");
const update_relatorio_use_case_1 = require("../../use-case/relatorio/update-relatorio-use-case");
const create_horario_use_case_1 = require("../../use-case/horario/create-horario-use-case");
class UpdateAppointmentController {
    async handle(req, res) {
        const { id, status } = req.body;
        if (!id || !status) {
            res.status(400).json({
                status: false,
                code: 400,
                message: `Campos obrigatórios faltando: ${!id ? "id" : ""} ${!status ? "status" : ""}`.trim(),
                data: [],
            });
            return;
        }
        const appointmentResponse = await new get_agendamento_by_id_use_case_1.GetAppointmentByIdUseCase().execute(id);
        if (!appointmentResponse.status || !appointmentResponse.data?.data) {
            res.status(404).json({
                status: false,
                code: 404,
                message: "Agendamento não encontrado",
                data: [],
            });
            return;
        }
        const agendamento = appointmentResponse.data.data;
        const statusProtegidos = [
            create_agendamento_interface_1.StatusAgendamento.CONCLUIDO,
            create_agendamento_interface_1.StatusAgendamento.CANCELADO,
            create_agendamento_interface_1.StatusAgendamento.NAO_COMPARECEU,
        ];
        if (statusProtegidos.includes(agendamento.status) && status !== agendamento.status) {
            const mensagens = {
                [create_agendamento_interface_1.StatusAgendamento.CONCLUIDO]: "Agendamento já concluído não pode ter o status alterado",
                [create_agendamento_interface_1.StatusAgendamento.CANCELADO]: "Agendamento cancelado não pode ter o status alterado",
                [create_agendamento_interface_1.StatusAgendamento.NAO_COMPARECEU]: "Agendamento marcado como não compareceu não pode ter o status alterado",
            };
            res.status(400).json({
                status: false,
                code: 400,
                message: mensagens[agendamento.status] ?? "Status inválido",
                data: [],
            });
            return;
        }
        const updatedAppointment = await new update_agendamento_use_case_1.UpdateAppointmentUseCase().execute({ id, status });
        if (status === create_agendamento_interface_1.StatusAgendamento.CONCLUIDO && agendamento.status !== create_agendamento_interface_1.StatusAgendamento.CONCLUIDO) {
            const clienteNome = agendamento.nome ?? "Cliente não informado";
            const valor = agendamento.servicoPreco ?? agendamento.servico?.valor ?? 0;
            try {
                await new create_financeiro_use_case_1.CreateFinanceiroUseCase().execute({
                    agendamentoId: agendamento.id,
                    clienteNome,
                    valor,
                    status: "Pago",
                });
                await new update_relatorio_use_case_1.UpdateRelatorioUseCase().execute({
                    mesAno: new Date(agendamento.criadoEm.getFullYear(), agendamento.criadoEm.getMonth(), 1),
                    faturamento: valor,
                });
            }
            catch (err) {
                console.error("Erro ao processar financeiro/relatório:", err);
            }
        }
        if (status === create_agendamento_interface_1.StatusAgendamento.CANCELADO && agendamento.status !== create_agendamento_interface_1.StatusAgendamento.CANCELADO) {
            try {
                const horarioParaCriar = {
                    profissionalId: agendamento.profissionalId,
                    data: agendamento.data,
                    inicio: agendamento.inicio,
                    fim: agendamento.fim,
                    disponivel: true,
                };
                await new create_horario_use_case_1.CreateHorarioUseCase().execute(horarioParaCriar);
                console.log(`[Horário] Horário criado após cancelamento.`);
                const mesAno = new Date(agendamento.criadoEm.getFullYear(), agendamento.criadoEm.getMonth(), 1);
                await new update_relatorio_use_case_1.UpdateRelatorioUseCase().execute({
                    mesAno,
                    cancelados: 1,
                });
            }
            catch (err) {
                console.error("Erro ao criar horário/atualizar relatório após cancelamento:", err);
            }
        }
        if (status === create_agendamento_interface_1.StatusAgendamento.NAO_COMPARECEU && agendamento.status !== create_agendamento_interface_1.StatusAgendamento.NAO_COMPARECEU) {
            try {
                const mesAno = new Date(agendamento.criadoEm.getFullYear(), agendamento.criadoEm.getMonth(), 1);
                await new update_relatorio_use_case_1.UpdateRelatorioUseCase().execute({
                    mesAno,
                    naoCompareceu: 1,
                });
            }
            catch (err) {
                console.error("Erro ao atualizar relatório após não comparecimento:", err);
            }
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: "Agendamento atualizado com sucesso",
            data: updatedAppointment,
        });
    }
}
exports.UpdateAppointmentController = UpdateAppointmentController;
