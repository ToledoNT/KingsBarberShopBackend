import { type Request, type Response, type NextFunction } from "express";

export class ProdutoMiddleware {

handleCreateProduto(req: Request, res: Response, next: NextFunction) {
  const { nome, preco, estoque, status, descricao, usuarioPendente, categoria } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
    return res.status(400).json({ error: "Nome do produto é obrigatório." });
  }

  if (preco === undefined || isNaN(Number(preco)) || Number(preco) < 0) {
    return res.status(400).json({ error: "Preço inválido." });
  }

  if (estoque === undefined || isNaN(Number(estoque)) || Number(estoque) < 0) {
    return res.status(400).json({ error: "Estoque inválido." });
  }

  const statusPermitidos = ["disponivel", "vendido", "consumido", "pendente"];
  if (status && !statusPermitidos.includes(status)) {
    return res.status(400).json({
      error: `Status inválido. Valores permitidos: ${statusPermitidos.join(", ")}`,
    });
  }

  if (descricao && typeof descricao !== "string") {
    return res.status(400).json({ error: "Descrição inválida." });
  }
  if (usuarioPendente && typeof usuarioPendente !== "string") {
    return res.status(400).json({ error: "Usuário pendente inválido." });
  }
  if (categoria && typeof categoria !== "string") {
    return res.status(400).json({ error: "Categoria inválida." });
  }

  next();
}

  handleUpdateProduto(req: Request, res: Response, next: NextFunction) {
    const { preco, quantidade, status } = req.body;

    if (preco !== undefined && (isNaN(Number(preco)) || Number(preco) < 0)) {
      return res.status(400).json({ error: "Preço inválido." });
    }

    if (quantidade !== undefined && (isNaN(Number(quantidade)) || Number(quantidade) < 0)) {
      return res.status(400).json({ error: "Quantidade inválida." });
    }

    const statusPermitidos = ["disponivel", "vendido", "consumido", "pendente"];
    if (status !== undefined && !statusPermitidos.includes(status)) {
      return res.status(400).json({ error: `Status inválido. Valores permitidos: ${statusPermitidos.join(", ")}` });
    }

    next();
  }

  handleDeleteProduto(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "ID do produto inválido." });
    }

    next();
  }
}