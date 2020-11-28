import axios from "axios";
import { API } from '../config';

class CourseService {

  async saveCourse(course) {
    return await axios.post(`${API.courses}`, course)
  }

  async updateCourse(id, course) {
    return await axios.put(`${API.courses}/${id}`, course)
  }

  async getAllCourses() {
    return await axios.get(`${API.courses}`)
  }

  async searchCourses(searchText) {
    return await axios.get(`${API.courses}/search?name=${searchText}`)
  }

  async deleteCourse(courseId) {
    return await axios.delete(`${API.courses}/`+courseId)
  }

}

const courseService = new CourseService();
export default courseService;
