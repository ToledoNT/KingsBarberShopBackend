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

// 🔹 Habilitar trust proxy para funcionar corretamente atrás do Nginx
server.set("trust proxy", 1);

server.use(express.json());
server.use(cookieParser());

// =========================
// 🧩 CORS configurado
// =========================
const allowedOrigins = [
  "https://www.kingsbarber.com.br",  // Prod frontend
  "https://kingsbarber.com.br",      // Prod backend ou outro domínio
  "http://localhost:3000",            // Localhost para dev
];

server.use(
  cors({
    origin: (origin, callback) => {
      // Se não houver origem (para requisições internas do servidor), permite a requisição
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Não autorizado pela política de CORS"));
      }
    },
    credentials: true,  // Para enviar cookies com as requisições
  })
);

// =========================
// Rotas
// =========================
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