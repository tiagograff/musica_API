require("dotenv").config();
const express = require("express");
const authRouter = require("./routers/auth-router");
const operationsRouter = require("./routers/operations-router");
const errorMiddleware = require("../../biblioteca_obc/src/middlewares/error-middleware");
const app = express();

app.use(express.json());

//rotas para serem usadas
app.use("/auth", authRouter);
app.use("/operations", operationsRouter);

//servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`aplicação rodando em http://localhost:${PORT}`)
);
