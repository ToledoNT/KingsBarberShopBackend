import { Request, Response } from "express";
import { GetHorariosByBarbeiroUseCase } from "../../use-case/horario/get-by-barbeiro-use-case";
import { GetProcedimentosByProfissionalUseCase } from "../../use-case/procedimento/fetch-by-profissional-use-case";

export class GetHorariosByBarbeiroController {
  async handle(req: Request<{ barbeiro: string }>, res: Response): Promise<Response> {
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
        new GetHorariosByBarbeiroUseCase().execute(barbeiro),
        new GetProcedimentosByProfissionalUseCase().execute(barbeiro),
      ]);

      const horariosDisponiveis = (horariosResult.data || [])
        .filter((h: any) => h.disponivel)
        .map((h: any) => ({
          id: h.id,
          inicio: h.inicio,
          fim: h.fim,
          label: `${h.inicio} - ${h.fim}`,
          disponivel: h.disponivel,
        }));

      const procedimentos = (procedimentosResult.data || []).map((p: any) => ({
        id: p.id,
        nome: p.nome,
        valor: p.valor,
        label: `${p.nome} - R$${p.valor.toFixed(2)}`,
      }));

      return res.status(200).json({
        status: true,
        message: "Dados carregados com sucesso",
        data: {
          barbeiroId: barbeiro,
          horarios: horariosDisponiveis,
          procedimentos,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar dados do barbeiro:", error);
      return res.status(500).json({
        status: false,
        message: "Erro interno ao buscar dados.",
        data: null,
      });
    }
  }
}