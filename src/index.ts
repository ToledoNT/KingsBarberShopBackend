import dotenv from "dotenv";
import server from "./server";
import https from "https";
import fs from "fs";

dotenv.config();

const PORT = Number(process.env.PORT) || 4001;

// ======== Carregar certificados SSL corretos ========
const httpsOptions = {
  key: fs.readFileSync("./ssl/192.168.18.129-key.pem"),
  cert: fs.readFileSync("./ssl/192.168.18.129.pem"),
};

// ======== Criar servidor HTTPS ========
https.createServer(httpsOptions, server).listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`🔐 Servidor HTTPS rodando em https://192.168.18.129:${PORT}`);
});