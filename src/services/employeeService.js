import axios from "axios";
import { API } from '../config';

class EmployeeService {

  async saveEmployee(employee) {
    return await axios.post(`${API.employees}`, employee)
  }

  async updateEmployee(id, employee) {
    return await axios.put(`${API.employees}/${id}`, employee)
  }

  async getAllEmployees() {
    return await axios.get(`${API.employees}`)
  }

  async searchEmployees(searchText) {
    return await axios.get(`${API.employees}/search?name=${searchText}`)
  }

  async deleteEmployee(employeeId) {
    return await axios.delete(`${API.employees}/`+employeeId)
  }

}

const employeeService = new EmployeeService();
export default employeeService;
