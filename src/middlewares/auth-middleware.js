const jwt = require("jsonwebtoken");
const usersModel = require("../models/users-model");

module.exports = {
  authMiddleware: (req, res, next) => {
    //acessando o cabeçalho de autorização de uma requisição
    const authHeader = req.headers.authorization;
    //verifica se o cabeçalho está presente na  solicitação
    if (!authHeader)
      return res.status(401).json({ message: "não autorizado!" });
    //pegando apenas o token da solicitação
    const token = authHeader.split(" ")[1];

    try {
      //verificando se o token é válido
      const { id } = jwt.verify(token, process.env.JWT_KEY);
      //pegando o usuário pelo id
      const user = usersModel.getUserById(id);
      if (!user)
        return res.status(404).json({ message: "usuário não encontrado!" });
      //responde com o usuário autenticado
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "token inválido!" });
    }
  },
};
