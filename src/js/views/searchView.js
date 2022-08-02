class SearchView {
  constructor() {
    this._parentElement = document.querySelector('.search');
    this._searchField = this._parentElement.querySelector('.search__field');
  }
  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._searchField.value = '';
  }
  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', event => {
      event.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
