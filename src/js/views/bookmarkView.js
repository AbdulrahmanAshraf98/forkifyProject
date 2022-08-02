import View from './view';

class BookmarkView extends View {
  constructor() {
    super(document.querySelector('.bookmarks__list'));
    // this._errorMessage = 'no bookmarks yet ';
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupView).join('');
  }
  _generateMarkupView(bookmarkItem) {
    const id = window.location.hash.slice(1);
    const recipeActiveClass =
      bookmarkItem.id === id ? 'preview__link--active' : '';
    return `<li class="preview">
        <a class="preview__link ${recipeActiveClass}" href="#${bookmarkItem.id}">
          <figure class="preview__fig">
            <img src="${bookmarkItem.image_url}" alt="${bookmarkItem.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${bookmarkItem.title}
            </h4>
            <p class="preview__publisher">${bookmarkItem.publisher}</p>
          </div>
        </a>
      </li>`;
  }
  addLoadBookmarkViewHandler(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();
