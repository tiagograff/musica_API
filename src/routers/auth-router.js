const express = require("express");
const authController = require("../controllers/auth-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");
const authRouter = express.Router();

//rota post de registrar um novo usuário
authRouter.post("/register", authController.register);
//rota para fazer login
authRouter.put("/login", authController.login);

module.exports = authRouter;
