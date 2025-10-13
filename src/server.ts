import express from "express";

export const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("🔥 Servidor rodando!");
});