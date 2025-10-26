import express, { Request, Response } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";

import UserRoute from "./router/user-route";
import ProfissionalRoute from "./router/profissional-route";
import AgendamentoRoute from "./router/agendamentos-admin-route";
import ProcedimentoRoute from "./router/procedimentos-route";
import HorarioRoute from "./router/horario-router";
import FinanceRoute from "./router/financeiro-route";
import RelatorioRoute from "./router/dashboard-route";
import StatusRoute from "./router/status-route";

const server = express();

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.18.129:3000",
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

// Rotas
server.use("/api", UserRoute);
server.use("/api", ProfissionalRoute);
server.use("/api", AgendamentoRoute);
server.use("/api", ProcedimentoRoute);
server.use("/api", HorarioRoute);
server.use("/api", FinanceRoute);
server.use("/api", RelatorioRoute);
server.use("/api", StatusRoute);

// Rota raiz
server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor HTTPS rodando e rotas carregadas!");
});

// Certificados autoassinados (para teste com IP)
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "ssl/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "ssl/cert.pem")),
};

// Rodando HTTPS direto no Node
https.createServer(sslOptions, server).listen(4001, () => {
  console.log("🔥 Servidor HTTPS rodando em https://SEU_IP:4001");
});
