import axios from "axios";
import { API } from '../config';

class StudentService {

  //js axio lib use to call http req
  async saveStudent(student) {
    return await axios.post(`${API.students}`,  student)
  }

  async updateStudent(id, student) {
    return await axios.put(`${API.students}/${id}`, student)
  }

  async getAllStudents() {
    return await axios.get(`${API.students}`)
  }

  async getStudentById(id) {
    return await axios.get(`${API.students}/${id}`)
  }

  async searchStudents(searchText) {
    return await axios.get(`${API.students}/search?name=${searchText}`)
  }

  async deleteStudent(studentId) {
    return await axios.delete(`${API.students}/`+studentId)
  }

}

const studentService = new StudentService();
export default studentService;
