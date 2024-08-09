const { v4: uuid } = require("uuid");

//array armazenando os usuários
const users = [
  {
    //usuário admin
    id: uuid(),
    name: "tiago",
    email: "tiago@example.com",
    password: "Passw@ord13",
    role: "admin",
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
  createUser(name, email, password) {
    const newUser = {
      id: uuid(),
      name,
      email,
      password,
      role: "standard",
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
