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
import ProdutosRouter from "./router/produtos-router"

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
    "https://kingsbarber.com.br",      
    "http://localhost:3000",           
  ];

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);  // Permite a requisição
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
// server.use("/api", UserRoute);
// server.use("/api", ProfissionalRoute);
// server.use("/api", AgendamentoRoute);
// server.use("/api", ProcedimentoRoute);
// server.use("/api", HorarioRoute);
// server.use("/api", FinanceRoute);
// server.use("/api", RelatorioRoute);
// server.use("/api", ProdutosRouter);
// server.use("/api", StatusRoute);

server.use(UserRoute);
server.use(ProfissionalRoute);
server.use(AgendamentoRoute);
server.use(ProcedimentoRoute);
server.use(HorarioRoute);
server.use(FinanceRoute);
server.use(RelatorioRoute);
server.use(ProdutosRouter);
server.use(StatusRoute);


// Rota raiz de teste para verificar se o servidor está funcionando
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

// Exportando o servidor para ser utilizado em outros arquivos (ex: index.ts)
export default server;