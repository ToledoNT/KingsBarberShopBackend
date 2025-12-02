import { prismaConnect } from "./db/prisma/prisma-connection";
import server from "./server";

const PORT = Number(process.env.PORT) || 4001;

(async () => {
  await prismaConnect(); // espera conectar antes de subir o servidor
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
  });
})();