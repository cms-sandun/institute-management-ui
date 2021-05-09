import axios from "axios";
import { API } from '../config';

class BatchService {

  async getResultSummaryReport(exam_id) {
    return await axios.get(`${API.reports}/result_summary?exam_id=${exam_id}`)
  }

}

const batchService = new BatchService();
export default batchService;
