import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importação das rotas
import UserRoute from "./router/user-route";
import ProfissionalRoute from "./router/profissional-route";
import AgendamentoRoute from "./router/agendamentos-admin-route";
import ProcedimentoRoute from "./router/procedimentos-route";
import HorarioRoute from "./router/horario-router";
import FinanceRoute from "./router/financeiro-route";
import RelatorioRoute from "./router/dashboard-route";
import StatusRoute from "./router/status-route";

// Inicializando o servidor
const server = express();

// 🔹 Habilitar trust proxy para funcionamento correto atrás do Nginx
server.set("trust proxy", 1);

// Usando JSON e cookieParser para manipulação de dados
server.use(express.json());
server.use(cookieParser());

// =========================
// Configuração CORS
// =========================
const allowedOrigins = [
  "https://www.kingsbarber.com.br",  // Frontend em produção
  "https://kingsbarber.com.br",      // Backend ou outro domínio em produção
  "http://localhost:3000",            // Localhost para desenvolvimento
];

// Configuração do middleware CORS
server.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origem (ex: internas no próprio servidor)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);  // Permite a requisição
      } else {
        callback(new Error("Não autorizado pela política de CORS"));  // Bloqueia requisições não permitidas
      }
    },
    credentials: true,  // Permitir o envio de cookies nas requisições
  })
);

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

// Rota raiz de teste para verificar se o servidor está funcionando
server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas!");
});

// Exportando o servidor para ser utilizado em outros arquivos (ex: index.ts)
export default server;