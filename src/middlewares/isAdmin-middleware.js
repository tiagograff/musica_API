const usersModel = require("../models/users-model");

module.exports = {
  isAdmin: (req, res, next) => {
    const { user } = req;
    if (!user) {
      res.status(404).json({ message: "usuário não encontrado" });
    }
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
