import axios from 'axios';

const API_URL_AUTH = 'http://localhost:5000/api/auth/';
const API_URL_USERS = 'http://localhost:5000/api/users/';

class AuthService {
  login(email, password) {
    console.log('yes login');
    return axios
      .post(API_URL_AUTH, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log('yes token');
        }

        return response.data;
      });
  }

  logout() {
    console.log('yes log out');
    localStorage.removeItem('user');
  }

  register(name, email, password) {
    console.log('yes register');
    return axios
      .post(API_URL_USERS, {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log('yes token');
        }

        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
