const express = require("express");
const authRouter = require("./routers/auth-router");
const app = express();

app.use(express.json());

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`aplicação rodando em http://localhost:${PORT}`)
);
