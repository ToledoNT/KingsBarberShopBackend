import dotenv from "dotenv";
import server from "./server";

dotenv.config();

const PORT = Number(process.env.PORT) || 4001;

// escuta em todas as interfaces
server.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});