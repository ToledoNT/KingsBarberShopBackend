"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHorarioController = void 0;
const create_horario_use_case_1 = require("../../use-case/horario/create-horario-use-case");
class CreateHorarioController {
    async handle(req, res) {
        const { profissional, data } = req.body;
        if (!profissional ||
            typeof profissional !== "object" ||
            !profissional.id ||
            typeof profissional.id !== "string" ||
            profissional.id.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'profissional.id' é obrigatório e deve ser uma string válida.",
                data: [],
            });
            return;
        }
        let dataValidada;
        if (typeof data === 'string' && data.match(/^\d{4}-\d{2}-\d{2}$/)) {
            dataValidada = new Date(data + 'T00:00:00.000Z');
        }
        else {
            dataValidada = new Date(data);
        }
        if (isNaN(dataValidada.getTime())) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "A data fornecida é inválida.",
                data: [],
            });
            return;
        }
        const dataUTC = new Date(Date.UTC(dataValidada.getUTCFullYear(), dataValidada.getUTCMonth(), dataValidada.getUTCDate()));
        const horariosParaCriar = [];
        const horaInicial = 7 * 60;
        const horaFinal = 21 * 60;
        const intervalo = 30;
        for (let minutos = horaInicial; minutos < horaFinal; minutos += intervalo) {
            const inicioHoras = Math.floor(minutos / 60);
            const inicioMinutos = minutos % 60;
            const fimHoras = Math.floor((minutos + intervalo) / 60);
            const fimMinutos = (minutos + intervalo) % 60;
            const inicio = `${inicioHoras.toString().padStart(2, "0")}:${inicioMinutos.toString().padStart(2, "0")}`;
            const fim = `${fimHoras.toString().padStart(2, "0")}:${fimMinutos.toString().padStart(2, "0")}`;
            horariosParaCriar.push({
                profissionalId: profissional.id,
                data: dataUTC,
                inicio,
                fim,
                disponivel: false,
            });
        }
        const resultados = [];
        const useCase = new create_horario_use_case_1.CreateHorarioUseCase();
        for (const horario of horariosParaCriar) {
            try {
                const result = await useCase.execute(horario);
                resultados.push(result);
            }
            catch (err) {
                console.error("Erro ao criar horário:", err);
                res.status(500).json({
                    status: false,
                    code: 500,
                    message: "Erro ao criar os horários.",
                    data: [],
                });
                return;
            }
        }
        res.status(201).json({
            status: true,
            code: 201,
            message: "Horários gerados com sucesso.",
            data: resultados,
        });
    }
}
exports.CreateHorarioController = CreateHorarioController;
