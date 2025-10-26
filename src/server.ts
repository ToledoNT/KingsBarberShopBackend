import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import UserRoute from "./router/user-route";
import ProfissionalRoute from "./router/profissional-route";
import AgendamentoRoute from "./router/agendamentos-admin-route";
import ProcedimentoRoute from "./router/procedimentos-route";
import HorarioRoute from "./router/horario-router";
import FinanceRoute from "./router/financeiro-route";
import RelatorioRoute from "./router/dashboard-route";
import StatusRoute from "./router/status-route";

const server = express();

// Parser para JSON
server.use(express.json());

// Parser para cookies
server.use(cookieParser());

// =========================
// 🧩 CORS configurado
// =========================
server.use(
  cors({
    origin: [
      "http://localhost:5173",      // front local (Vite/Next)
      "https://kingsbarber.com.br", // domínio oficial
    ],
    credentials: true, // ESSENCIAL para enviar cookies
  })
);

// Rotas
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
