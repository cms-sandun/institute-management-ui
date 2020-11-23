import axios from "axios";
import { API } from '../config';

class StudentService {

  async saveStudent(student) {
    return await axios.post(`${API.students}`, student)
  }

  async getAllStudents() {
    return await axios.get(`${API.students}`)
  }

  async deleteStudent(studentId) {
    return await axios.delete(`${API.students}/`+studentId)
  }

}

const studentService = new StudentService();
export default studentService;
