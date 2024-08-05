const express = require("express");
const authController = require("../controllers/auth-controller");
const authRouter = express.Router();

//rota que devolve todos os usuários cadastrados
authRouter.get("/users", authController.getAllUsers);
//rota que devolve um usuário em específico através do ID
authRouter.get("/users/:id", authController.getUser);
//rota post de registrar um novo usuário
authRouter.post("/register", authController.register);
//rota para atualizar um usuário
authRouter.put("/users/:id", authController.updateUser);
//rota para deletar um usuário
authRouter.delete("/users/:id", authController.deleteUser);

module.exports = authRouter;
