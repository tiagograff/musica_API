const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`aplicação rodando em http://localhost:${PORT}`)
);
