import axios from "axios";
import { API } from '../config';

class UserService {

  async saveUser(user) {
    return await axios.post(`${API.users}`, user)
  }

  async updateUser(id, user) {
    return await axios.put(`${API.users}/${id}`, user)
  }

  async getAllUsers() {
    return await axios.get(`${API.users}`)
  }

  async searchUsers(searchText) {
    return await axios.get(`${API.users}/search?name=${searchText}`)
  }

  async deleteUser(userId) {
    return await axios.delete(`${API.users}/`+userId)
  }

}

const userService = new UserService();
export default userService;
