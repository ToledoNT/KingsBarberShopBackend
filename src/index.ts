import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import server from "./server";

dotenv.config();

const PORT = Number(process.env.PORT) || 4001;

// Caminhos dos certificados
const keyPath = "./cert/server.key";
const certPath = "./cert/server.cert";

// Validação
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("❌ Arquivos SSL não encontrados!");
  console.error(`Chave: ${keyPath}\nCertificado: ${certPath}`);
  process.exit(1);
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

// Cria servidor HTTPS
https.createServer(options, server).listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`✅ Servidor HTTPS rodando em: https://192.168.18.129:${PORT}`);
});