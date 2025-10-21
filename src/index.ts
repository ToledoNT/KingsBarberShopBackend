import dotenv from "dotenv";
import server from "./server";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 4001;

server.listen(PORT, "0.0.0.0", () => {
  console.clear();
  console.log(`--Server ON-- http://192.168.18.129:${PORT}`);
});