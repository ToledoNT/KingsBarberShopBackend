import dotenv from "dotenv";
import server from "./server";
dotenv.config();


const PORT = 4001;

server.listen(PORT, () => {
  console.clear();
  console.log(`--Server ON-- http://localhost:${PORT}`);
});