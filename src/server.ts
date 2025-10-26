import express, { Request, Response } from "express";
import helmet from "helmet";

import UserRoute from "./router/user-route";
import ProfissionalRoute from "./router/profissional-route";
import AgendamentoRoute from "./router/agendamentos-admin-route";
import ProcedimentoRoute from "./router/procedimentos-route";
import HorarioRoute from "./router/horario-router";
import FinanceRoute from "./router/financeiro-route";
import RelatorioRoute from "./router/dashboard-route";
import StatusRoute from "./router/status-route";

const server = express();

// =========================
// Middlewares
// =========================
server.use(express.json());

// =========================
// Content Security Policy
// =========================
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // permite recursos do mesmo domínio
      imgSrc: ["'self'", "https://kingsbarber.com.br"], // favicon e imagens
      scriptSrc: ["'self'"], // scripts do domínio
      styleSrc: ["'self'"], // CSS do domínio
      fontSrc: ["'self'"] // fontes do domínio
    }
  })
);

// =========================
// Rotas da aplicação
// =========================
server.use("/api", UserRoute);
server.use("/api", ProfissionalRoute);
server.use("/api", AgendamentoRoute);
server.use("/api", ProcedimentoRoute);
server.use("/api", HorarioRoute);
server.use("/api", FinanceRoute);
server.use("/api", RelatorioRoute);
server.use("/api", StatusRoute);

// =========================
// Rota raiz de teste
// =========================
server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas!");
});

export default server;