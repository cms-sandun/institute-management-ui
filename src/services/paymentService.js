import axios from "axios";
import { API } from '../config';

class PaymentService {

    //js axio lib use to call http req
    async savePayment(payment) {
        return await axios.post(`${API.payments}`, payment)
    }

    async updateStudent(id, student) {
        return await axios.put(`${API.students}/${id}`, student)
    }

    async getAllPayments() {
        return await axios.get(`${API.payments}`)
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

const paymentService = new PaymentService();
export default paymentService;
