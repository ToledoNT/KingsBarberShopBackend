import { Request, Response } from "express";
import { GetHorariosByBarbeiroUseCase } from "../../use-case/horario/get-by-barbeiro-use-case";
import { GetProcedimentosByProfissionalUseCase } from "../../use-case/procedimento/fetch-by-profissional-use-case";
import { HorarioDTO, ProcedimentoDTO } from "../../interface/horario/get-horario-barbeiro-interface";

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

      const horariosDisponiveis: HorarioDTO[] = (horariosResult.data || [])
        .filter((h: any) => h.disponivel)
        .map((h: any) => ({
          id: h.id,
          inicio: h.inicio,
          fim: h.fim,
          data: h.data, 
          label: h.label ?? `${h.inicio} - ${h.fim}`,
          disponivel: h.disponivel,
        }));

      const procedimentos: ProcedimentoDTO[] = (procedimentosResult.data || []).map((p: any) => ({
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