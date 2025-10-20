import dotenv from "dotenv";
import server from "./server";
dotenv.config();

const PORT = 4001;

// Escuta em 0.0.0.0 para aceitar conexões da rede local
server.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`--Server ON-- http://192.168.18.129:${PORT}`);
});