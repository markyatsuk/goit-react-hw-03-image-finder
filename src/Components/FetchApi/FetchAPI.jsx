const axios = require("axios").default;
export default class PicturesApiService {
  constructor() {
    this.BASE_URL = "https://pixabay.com/api/";
    this.KEY = "?key=25846994-f61f238b1642b7912a0ecf7e9";
    this.searchQuery = "";
    this.page = 1;
    this.per_page = "per_page=12";
  }

  async fetchPictures() {
    const fetchResponse = await axios.get(
      `${this.BASE_URL}${this.KEY}&q=${this.searchQuery}&page=${this.page}&${this.per_page}`
    );
    console.log(fetchResponse);
    this.incrementPage();
    return fetchResponse;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
