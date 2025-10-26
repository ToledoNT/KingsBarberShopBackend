import dotenv from "dotenv";
import server from "./server";

dotenv.config();

// Middleware de log para depuração
server.use((req, res, next) => {
  console.log(`🚀 Request recebida: ${req.method} ${req.originalUrl}`);
  console.log("Headers recebidos:", req.headers);
  next();
});

const PORT = Number(process.env.PORT) || 4001;

// escuta em todas as interfaces
server.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});