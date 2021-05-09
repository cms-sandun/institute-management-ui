import axios from "axios";
import { API } from '../config';

class AuthService {

  async login(payload) {
    return await axios.post(`${API.users}/login`, payload)
  }

  isLogged() {
    return localStorage.getItem('user') != null
  }

}

const authService = new AuthService();
export default authService;
