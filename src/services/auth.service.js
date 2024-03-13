import axios from "axios";
const API_URL = "https://connect-api.onrender.com/api/user";
const API_URLOther = "https://connect-api.onrender.com/api/other";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  editProfile(_id, username, bio, token) {
    return axios.patch(API_URL + "/" + _id, {
      username,
      bio,
      token,
    });
  }

  getOtherProfile(_id) {
    return axios.get(API_URLOther + "/" + _id, {});
  }

  follow(userId, followerId) {
    return axios.post(API_URL + "/follow", {
      userId,
      followerId,
    });
  }

  searchUser(username) {
    return axios.get(API_URLOther + "/search/" + username, {});
  }

  getUsers() {
    return axios.get(API_URLOther + "/allUser", {});
  }
}

export default new AuthService();
