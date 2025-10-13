import express, { type Request, Response } from "express";
import UserRoute from "./router/user-route";
import ProfissionalRoute from "./router/profissional-route";
import AgendamentoRoute from "./router/agendamentos-admin-route";
// import HorarioRoute from "./router/horarios-route";

const server = express();

server.use(express.json());

// Rotas da API
server.use("/api/users", UserRoute);
server.use("/api/profissionais", ProfissionalRoute);
server.use("/api/agendamentos", AgendamentoRoute);
// server.use("/api/horarios", HorarioRoute);

// Rota raiz
server.get("/", (req: Request, res: Response) => {
  res.send("🔥 Servidor rodando e rotas carregadas com sucesso!");
});

export default server;