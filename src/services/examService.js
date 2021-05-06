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

  async enrollToExam(studentId, examId) {
    return await axios.get(`${API.exams}/enroll?stu_id=`+studentId+'&exam_id='+examId)
  }

  async notifyBatch(payload) {
    return await axios.post(`${API.exams}/notify`,payload)
  }

  async getEnrolledStudents(exam_id) {
    return await axios.get(`${API.exams}/export/enrolled_students?exam_id=`+exam_id)
  }

}

const examService = new ExamService();
export default examService;
