import express, { Request, Response } from "express";
import cors from "cors";
import UserRoute from "./router/user-route";
import ProfissionalRoute from "./router/profissional-route";
import AgendamentoRoute from "./router/agendamentos-admin-route";
import ProcedimentoRoute from "./router/procedimentos-route";
import HorarioRoute from "./router/horario-router"

const server = express();

server.use(cors({ origin: "http://localhost:3000" }));

server.use(express.json());

server.use("/api", UserRoute);
server.use("/api", ProfissionalRoute);
server.use("/api", AgendamentoRoute);
server.use("/api", ProcedimentoRoute); 
server.use("/api", HorarioRoute); 

server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas com sucesso!");
});

export default server;