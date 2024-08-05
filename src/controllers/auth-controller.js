const usersModel = require("../models/users-model");

//função que verifica se a senha é válida
function passwordIsValid(password) {
  const regex =
    //expressão regex para regulamentar
    /^(?=(.*[A-Z]))(?=(.*[a-zA-Z].*){5,})(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>])).{8,}$/;
  return regex.test(password);
}

module.exports = {
  //POST -> auth/register
  register: (req, res) => {
    //pegando dados do corpo da requisição
    const { email, password } = req.body;
    //verificando o tipo de dado
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "invalid data type" });
    }
    //verificando se o email já está cadastrado
    const emailAlreadyExists = usersModel.getUserByEmail(email);
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ message: "este email já está cadastrado!" });
    }
    //verificando se a senha está nos padrões corretos de segurança
    if (!passwordIsValid(password)) {
      return res.status(400).json({
        message:
          "senha deve conter, ao menos 5 letras,1 letra maiúscula,1 número, 1 caractere especial, com um total de 8 caracteres",
      });
    }

    const newUser = usersModel.createUser(email, password);
    res.status(200).json(newUser);
  },
};
