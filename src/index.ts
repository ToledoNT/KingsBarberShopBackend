import dotenv from "dotenv";
import server from "./server";
dotenv.config();


const PORT = 4001;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.clear();
  console.log(`--Server ON--`);
});