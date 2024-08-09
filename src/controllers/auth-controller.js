const {
  typeIsString,
  passwordIsValid,
  emailIsValid,
} = require("../functions/validation");
const usersModel = require("../models/users-model");
const jwt = require("jsonwebtoken");

module.exports = {
  //POST -> auth/register
  register: (req, res) => {
    //pegando dados do corpo da requisição
    const { name, email, password } = req.body;
    //verificando o tipo de dado
    if (!typeIsString(name, email, password)) {
      return res.status(400).json({ message: "tipo de dado inválido!" });
    }
    //verificando se o email já está cadastrado
    const emailAlreadyExists = usersModel.getUserByEmail(email);
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ message: "este email já está cadastrado!" });
    }
    //verificando se email é válido
    if (!emailIsValid(email)) {
      return res.status(400).json({ message: "email inválido" });
    }
    //verificando se a senha está nos padrões corretos de segurança
    if (!passwordIsValid(password)) {
      return res.status(400).json({
        message:
          "senha deve conter, ao menos 5 letras,1 letra maiúscula,1 número, 1 caractere especial, com um total de 8 caracteres",
      });
    }

    //criando um novo usuário
    const newUser = usersModel.createUser(name, email, password);
    res.status(200).json(newUser);
  },

  //POST -> /auth/login
  login: (req, res) => {
    const { email, password } = req.body;
    //verificando tipo de dado
    if (!typeIsString(email, password)) {
      return res.status(400).json({ message: "tipo de dado inválido" });
    }
    //pegando usuário através de seu e-mail
    const user = usersModel.getUserByEmail(email);
    //caso usuário não exista
    if (!user) {
      return res.status(400).json({ message: "usuário não encontrado" });
    }
    //verificando se a senha e o email estão corretos
    if (user.email !== email || user.password !== password) {
      return res.status(400).json({ message: "usuário ou senha inválidos" });
    }
    //criando token de autenticação
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
    res.json({ token: token, message: `seja bem-vindo(a) ${user.name}` });
  },
};
