import axios from "axios";
import { API } from '../config';

class BatchService {

  async saveBatch(batch) {
    return await axios.get(`${API.batches}`, batch)
  }

}

const batchService = new BatchService();
export default batchService;
