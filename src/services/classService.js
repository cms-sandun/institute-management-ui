import axios from "axios";
import { API } from '../config';

class ClassService {

  async saveClass(cls) {
    return await axios.post(`${API.classes}`, cls)
  }

  async updateClass(id, cls) {
    return await axios.put(`${API.classes}/${id}`, cls)
  }

  async getAllClass() {
    return await axios.get(`${API.classes}`)
  }

  async searchClasss(searchText) {
    return await axios.get(`${API.classes}/search?name=${searchText}`)
  }

  async deleteClass(clsId) {
    return await axios.delete(`${API.classes}/`+clsId)
  }

}

const classService = new ClassService();
export default classService;
