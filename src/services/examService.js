import axios from "axios";
import { API } from '../config';

class ExamService {

  async saveExam(exam) {
    return await axios.post(`${API.exams}`, exam)
  }

  async updateExam(id, exam) {
    return await axios.put(`${API.exams}/${id}`, exam)
  }

  async getAllExames() {
    return await axios.get(`${API.exams}`)
  }

  async searchExames(searchText) {
    return await axios.get(`${API.exams}/search?name=${searchText}`)
  }

  async deleteExam(examId) {
    return await axios.delete(`${API.exams}/`+examId)
  }

}

const examService = new ExamService();
export default examService;
