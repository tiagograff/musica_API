module.exports = {
  //função que verifica se a senha é válida
  passwordIsValid(password) {
    const regex =
      //expressão regex para regulamentar
      /^(?=(.*[A-Z]))(?=(.*[a-zA-Z].*){5,})(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>])).{8,}$/;
    return regex.test(password);
  },

  //função que verifica se o email é valido
  emailIsValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  },

  yearIsValid(year) {
    const regex = /^\d{4,}$/;
    return regex.test(year);
  },

  //função que verifica se o tipo é string
  typeIsString(...types) {
    return types.every((type) => typeof type === "string");
  },
};
