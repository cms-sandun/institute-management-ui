import axios from "axios";
import { API } from '../config';

class EventsService {

  async getAllEvents(batch) {
    return await axios.get(`${API.events}`)
  }
}

const eventsService = new EventsService();
export default eventsService;
