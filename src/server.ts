import express, { Request, Response } from "express";
import cors from "cors";

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
// 🧩 CORS para testes com ngrok
// =========================
server.use(
  cors({
    origin: [
      "http://localhost:5173",         // front local (Vite)
      "https://kingsbarber.com.br",    // domínio oficial
      "https://16992f8c5e5e.ngrok-free.app", // substitui pelo link do ngrok
    ],
    credentials: true,
  })
);

// JSON parser
server.use(express.json());

// Rotas da aplicação
server.use("/api", UserRoute);
server.use("/api", ProfissionalRoute);
server.use("/api", AgendamentoRoute);
server.use("/api", ProcedimentoRoute);
server.use("/api", HorarioRoute);
server.use("/api", FinanceRoute);
server.use("/api", RelatorioRoute);
server.use("/api", StatusRoute);

// Rota raiz de teste
server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas!");
});

export default server;
