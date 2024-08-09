const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const operationsController = require("../controllers/operations-controller");
const { isAdmin } = require("../middlewares/isAdmin-middleware");
const operationsRouter = express.Router();

//rota que devolve todos os usuários cadastrados
operationsRouter.get("/users", operationsController.getAllUsers);
//rota que devolve um usuário em específico através do ID
operationsRouter.get("/users/:id", operationsController.getUser);
//rota para atualizar um usuário
operationsRouter.put(
  "/users/:id",
  authMiddleware,
  isAdmin,
  operationsController.updateUser
);
//rota para deletar um usuário
operationsRouter.delete(
  "/users/:id",
  authMiddleware,
  isAdmin,
  operationsController.deleteUser
);

module.exports = operationsRouter;
