"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHorariosByBarbeiroController = void 0;
const get_by_barbeiro_use_case_1 = require("../../use-case/horario/get-by-barbeiro-use-case");
const fetch_by_profissional_use_case_1 = require("../../use-case/procedimento/fetch-by-profissional-use-case");
class GetHorariosByBarbeiroController {
    async handle(req, res) {
        try {
            const { barbeiro } = req.params;
            if (!barbeiro) {
                return res.status(400).json({
                    status: false,
                    message: "O parâmetro 'barbeiro' é obrigatório.",
                    data: null,
                });
            }
            const [horariosResult, procedimentosResult] = await Promise.all([
                new get_by_barbeiro_use_case_1.GetHorariosByBarbeiroUseCase().execute(barbeiro),
                new fetch_by_profissional_use_case_1.GetProcedimentosByProfissionalUseCase().execute(barbeiro),
            ]);
            const horariosDisponiveis = (horariosResult.data || [])
                .filter((h) => h.disponivel)
                .map((h) => ({
                id: h.id,
                inicio: h.inicio,
                fim: h.fim,
                data: h.data,
                label: h.label ?? `${h.inicio} - ${h.fim}`,
                disponivel: h.disponivel,
            }));
            const procedimentos = (procedimentosResult.data || []).map((p) => ({
                id: p.id,
                nome: p.nome,
                valor: p.valor,
                label: p.label ?? `${p.nome} - R$${p.valor.toFixed(2)}`,
            }));
            const responseData = {
                barbeiroId: barbeiro,
                horarios: horariosDisponiveis,
                procedimentos,
            };
            return res.status(200).json({
                status: true,
                message: "Dados carregados com sucesso",
                data: responseData,
            });
        }
        catch (error) {
            console.error("Erro ao buscar dados do barbeiro:", error);
            return res.status(500).json({
                status: false,
                message: "Erro interno ao buscar dados.",
                data: null,
            });
        }
    }
}
exports.GetHorariosByBarbeiroController = GetHorariosByBarbeiroController;
