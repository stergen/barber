import Http from "../utils/Http";

class User {
  static create = (firstName, phone, password) =>
    Http.post(`${process.env.REACT_APP_API_URL}/users`, {
      firstName,
      phone,
      password
    });

  static get = () => Http.get(`${process.env.REACT_APP_API_URL}/users`, {});

  static logIn = (phone, password) =>
    Http.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      phone,
      password
    });
}

export default User;
