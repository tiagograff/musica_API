const express = require("express");
const authController = require("../controllers/auth-controller");
const authRouter = express.Router();

//rota post de registrar um novo usuário
authRouter.post("/register", authController.register);

module.exports = authRouter;
