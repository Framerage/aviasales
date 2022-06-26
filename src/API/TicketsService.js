import axios from "axios";

export default class TicketsService {
  static async getTickets(limit,page) {
    const response = await axios.get(
      'https://62b5bd93da3017eabb2177a9.mockapi.io/api/search/tickets',
      {
        params:{
          limit:limit,
          page:page
        }
      }
    );
    return response;
  }
}
