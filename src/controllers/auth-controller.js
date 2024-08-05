const usersModel = require("../models/users-model");

//função que verifica se a senha é válida
function passwordIsValid(password) {
  const regex =
    //expressão regex para regulamentar
    /^(?=(.*[A-Z]))(?=(.*[a-zA-Z].*){5,})(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>])).{8,}$/;
  return regex.test(password);
}

function emailIsValid(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
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
    const newUser = usersModel.createUser(email, password);
    res.status(200).json(newUser);
  },
  //GET -> /auth/users
  getAllUsers: (req, res) => {
    //lista de todos os usuários
    const users = usersModel.getUsers();
    res.status(200).json(users);
  },
  //GET -> /auth/users/:id
  getUser: (req, res) => {
    //pegando o id do usuário nos parametros
    const id = req.params.id;
    const user = usersModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "usuário não encontrado!" });
    }
    res.status(200).json(user);
  },
  //PUT -> /auth/users/:id
  updateUser: (req, res) => {
    //pegando o id do usuário nos parametros
    const id = req.params.id;
    //pegando os dados do corpo da requisição
    const { email, password } = req.body;
    const updateUser = usersModel.getUserById(id);
    if (!updateUser) {
      return res.status(404).json({ message: "usuário não encontrado!" });
    }
    //verificando o tipo de dado
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "tipo de dado inválido" });
    }
    //verificando se o email já está cadastrado
    const emailAlreadyExists = usersModel.getUserByEmail(email);
    if (emailAlreadyExists) {
      return res.status(400).json({ message: "o email já está cadastrado!" });
    }
    //verificando se email é válido
    if (!emailIsValid(email)) {
      return res.status(400).json({ message: "email inválido" });
    }
    //verificando se a senha está nas configurações corretas
    if (!passwordIsValid(password)) {
      return res.status(400).json({
        message:
          "senha inválida! a senha deve conter, ao menos 5 letras,1 letra maiúscula,1 número, 1 caractere especial, com um total de 8 caracteres",
      });
    }

    //fazendo o update
    updateUser.email = email;
    updateUser.password = password;

    res.status(200).json(updateUser);
  },
  //delete -> /auth/users/:id
  deleteUser: (req, res) => {
    //pegando o id do usuário nos parametros
    const id = req.params.id;
    //deletando usuário
    const deletedUser = usersModel.deleteUser(id);
    //verificando existencia do usuário
    if (!deletedUser) {
      return res.status(404).json({ message: "usuário não foi encontrado" });
    }
    res.status(200).json({ message: "usuário deletado com sucesso!" });
  },
};
