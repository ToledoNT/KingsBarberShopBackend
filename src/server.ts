import express, { Request, Response, NextFunction } from "express";
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

server.set("trust proxy", 1);

server.use(express.json());
server.use(cookieParser());

// =========================
// Função para configuração de CORS
// =========================
const configureCORS = () => {
const allowedOrigins = [
    "https://www.kingsbarber.com.br",  
    "https://kingsbarber.com.br"    
];

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);  
      } else {
        console.log(`CORS bloqueado para origem: ${origin}`); 
        callback(new Error("Não autorizado pela política de CORS"));  
      }
    },
    credentials: true,  
  });
};

// =========================
// Configuração do CORS
// =========================
server.use(configureCORS());

// =========================
// Configuração das Rotas
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
  res.send("🔥 Servidor rodando e rotas carregadas!");
});

// =========================
// Middleware de Erros (Handler Global)
// =========================
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro inesperado:", err);  // Log do erro
  res.status(500).json({
    status: false,
    code: 500,
    message: "Erro interno do servidor. Tente novamente mais tarde.",
    data: null,
  });
});

export default server;