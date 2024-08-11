require("dotenv").config();
const express = require("express");
const authRouter = require("./routers/auth-router");
const operationsRouter = require("./routers/operations-router");
const albumRouter = require("./routers/album-router");
const filtersRouter = require("./routers/filters-router");

const app = express();

app.use(express.json());

//rotas para serem usadas
app.use("/auth", authRouter);
app.use("/operations/users", operationsRouter);
app.use("/api/albuns", albumRouter);
app.use("/filters", filtersRouter);

//servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`aplicação rodando em http://localhost:${PORT}`)
);
