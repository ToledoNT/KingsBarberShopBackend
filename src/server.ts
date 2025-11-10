import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
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

server.set("trust proxy", 1);
server.use(express.json());
server.use(cookieParser());

// =========================
// ✅ Configuração do CORS
// =========================
const allowedOrigins = [
  "https://192.168.18.129:3000", // Next HTTPS local
  "http://192.168.18.129:3000",  // Next HTTP local (se ainda não rodar https)
  "https://localhost:3000",
  "http://localhost:3000",
  "https://www.kingsbarber.com.br",
  "https://kingsbarber.com.br"
];


const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Permite requisições sem 'origin' (ex: Postman)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS bloqueado para origem: ${origin}`);
      callback(new Error("Não autorizado pela política de CORS"));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions));

// =========================
// ✅ Rotas da aplicação
// =========================
server.use("/api", UserRoute);
server.use("/api", ProfissionalRoute);
server.use("/api", AgendamentoRoute);
server.use("/api", ProcedimentoRoute);
server.use("/api", HorarioRoute);
server.use("/api", FinanceRoute);
server.use("/api", RelatorioRoute);
server.use("/api", StatusRoute);

server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas com sucesso!");
});

// =========================
// ✅ Middleware Global de Erros
// =========================
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro inesperado:", err.message);
  res.status(500).json({
    status: false,
    code: 500,
    message: "Erro interno do servidor. Tente novamente mais tarde.",
  });
});

export default server;