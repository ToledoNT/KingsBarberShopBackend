import fs from "fs";
import https from "https";
import express from "express";
import serverApp from "./server"; // seu express app

const PORT = Number(process.env.PORT) || 4001;

if (process.env.NODE_ENV === "production") {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY!),
    cert: fs.readFileSync(process.env.SSL_CERT!),
    ca: process.env.SSL_CHAIN ? fs.readFileSync(process.env.SSL_CHAIN) : undefined,
  };

  https.createServer(sslOptions, serverApp).listen(PORT, () => {
    console.log(`🔥 Servidor HTTPS rodando em https://seu-dominio:${PORT}`);
  });
} else {
  // desenvolvimento HTTP
  serverApp.listen(PORT, "0.0.0.0", () => {
    console.log(`🔥 Servidor HTTP rodando em http://localhost:${PORT}`);
  });
}