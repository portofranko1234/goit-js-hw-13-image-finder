export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  goFetch() {
    console.log(this);
    const API_KEY = '22486349-475ac57b79bf68bd3ecb1002b';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
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

  set query(NewQuery) {
    this.searchQuery = NewQuery;
  }
}
