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

// 🔒 Configuração CORS segura
const allowedOrigins = [
  "https://www.kingsbarber.com.br",
  "https://kingsbarber.com.br",
  "http://localhost:3000",
  "http://192.168.18.129:3000"
];

server.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origem não permitida pelo CORS"));
    }
  },
  credentials: true,
}));

server.use(express.json());

// 🧩 Rotas da aplicação
server.use("/api", UserRoute);
server.use("/api", ProfissionalRoute);
server.use("/api", AgendamentoRoute);
server.use("/api", ProcedimentoRoute);
server.use("/api", HorarioRoute);
server.use("/api", FinanceRoute);
server.use("/api", RelatorioRoute);
server.use("/api", StatusRoute);

// 🔥 Rota raiz de teste
server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas com sucesso!");
});

// 🖥️ Apenas HTTP local, o HTTPS será tratado pelo Nginx
server.listen(4001, () => {
  console.log("Servidor HTTP rodando em http://localhost:4001");
});

export default server;