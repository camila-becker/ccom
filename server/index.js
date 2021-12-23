const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const routes = require("./src/routes");

const configs = {
  caminho: "dist",
  port: process.env.PORT || 3000,
};

const root = path.join(__dirname, configs.caminho);

require("./src/database");

//Middleware
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(express.static(root));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(configs.port, () => {
  console.log(`Escutando na porta ${configs.port}!`);
});
