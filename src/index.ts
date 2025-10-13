import dotenv from "dotenv";
dotenv.config();

import { server } from "./server";

const PORT = Number(process.env.PORT) || 4001;
const HOST = "localhost"; 

try {
  server.listen(PORT, HOST, () => {
    console.clear();
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  });
} catch (err) {
  console.error("❌ Erro ao iniciar o servidor:", err);
}