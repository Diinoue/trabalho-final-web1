const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
const db = require("../models/dbConnect.js"); 

const app = express();
const url = "http://localhost";
const port = 3001;

// Testando a conexão com o banco de dados
(async () => {
  try {
    await db.testConnection();
    console.log("Conexão com o banco de dados bem-sucedida.");
  } catch (err) {
    console.error(
      "Não foi possível conectar ao banco de dados. Encerrando o aplicativo.",
      err
    );
    process.exit(1);
  }
})();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(routes);

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Rota principal
app.get("/", (request, response) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`O servidor está rodando em ${url}:${port}`);
});