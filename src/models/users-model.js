const { v4: uuid } = require("uuid");

//array armazenando os usuários
const users = [
  {
    //usuário admin
    id: uuid(),
    name: "admin",
    email: "admin@example.com",
    password: "Passw@ord13",
  },
];

//exportando métodos
module.exports = {
  //lista todos os usuários
  getUsers: () => users,
  //busca de usuário baseado no id
  getUserById: (id) => users.find((user) => user.id === id),
  //busca de usuário baseado no email
  getUserByEmail: (email) => users.find((user) => user.email === email),
  //criação de novo usuário, por padrão é standard
  createUser(email, password) {
    const newUser = {
      id: uuid(),
      name: "standard",
      email,
      password,
    };
    users.push(newUser);
    return newUser;
  },
  //deletando um usuário
  deleteUser(id) {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
  },
};
