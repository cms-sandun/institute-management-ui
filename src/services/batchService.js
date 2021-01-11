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

}

const batchService = new BatchService();
export default batchService;
