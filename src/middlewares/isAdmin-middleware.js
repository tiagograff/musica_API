const usersModel = require("../models/users-model");

module.exports = {
  isAdmin: (req, res, next) => {
    //pegando o usuário logado na requisição
    const { user } = req;
    if (!user) {
      res.status(404).json({ message: "usuário não encontrado" });
    }
    //verifica se o usuário logado é um administrador
    if (user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message:
          "permissão negada, apenas administradores podem efetuar essa operação!",
      });
    }
  },
};
