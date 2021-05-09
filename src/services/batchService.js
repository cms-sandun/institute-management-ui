import axios from "axios";
import { API } from '../config';

class BatchService {

  async saveBatch(batch) {
    return await axios.post(`${API.batches}`, batch)
  }

  async updateBatch(id, batch) {
    return await axios.put(`${API.batches}/${id}`, batch)
  }

  async getAllBatches() {
    return await axios.get(`${API.batches}`)
  }

  async searchBatches(searchText) {
    return await axios.get(`${API.batches}/search?name=${searchText}`)
  }

  async deleteBatch(batchId) {
    return await axios.delete(`${API.batches}/`+batchId)
  }

  async addAssociateStudent(payload) {
    return await axios.post(`${API.batches}/associate_students`,payload)
  }

  async getAssociateStudent(batchId) {
    return await axios.get(`${API.batches}/associate_students?batch_id=`+batchId)
  }

  async deleteAssociateStudent(id) {
    return await axios.delete(`${API.batches}/associate_students?id=`+id)
  }

}

const batchService = new BatchService();
export default batchService;
