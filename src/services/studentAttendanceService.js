import axios from "axios";
import { API } from '../config';

class StudentAttendanceService {

  async saveAttendance(attendance) {
    return await axios.post(`${API.students_attendance}`, attendance)
  }

  async updateAttendance(id, attendance) {
    return await axios.put(`${API.students_attendance}/${id}`, attendance)
  }

  async getAllAttendances() {
    return await axios.get(`${API.students_attendance}`)
  }

  async getAttendanceById(id) {
    return await axios.get(`${API.students_attendance}/${id}`)
  }

  async searchAttendances(searchText) {
    return await axios.get(`${API.students_attendance}/search?name=${searchText}`)
  }

  async deleteAttendance(attendanceId) {
    return await axios.delete(`${API.students_attendance}/`+attendanceId)
  }

}

const studentAttendanceService = new StudentAttendanceService();
export default studentAttendanceService;
