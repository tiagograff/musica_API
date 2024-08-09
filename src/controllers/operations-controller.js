const usersModel = require("../models/users-model");

const {
  typeIsString,
  passwordIsValid,
  emailIsValid,
} = require("../functions/validation");

module.exports = {
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
    const { name, email, password } = req.body;
    const updateUser = usersModel.getUserById(id);
    if (!updateUser) {
      return res.status(404).json({ message: "usuário não encontrado!" });
    }
    //verificando o tipo de dado
    if (!typeIsString(name, email, password)) {
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
    updateUser.name = name;
    updateUser.email = email;
    updateUser.password = password;

    res.status(200).json(updateUser);
  },
  //delete -> /auth/users/:id
  deleteUser: (req, res) => {
    //pegando o id do usuário nos parametros
    const id = req.params.id;
    //pegando usuário
    const user = usersModel.getUserById(id);
    //verificando existencia do usuário
    if (!user) {
      return res.status(404).json({ message: "usuário não foi encontrado" });
    }
    //deletando usuário
    const deletedUser = usersModel.deleteUser(id);
    res.status(200).json({ message: "usuário deletado com sucesso!" });
  },
};
