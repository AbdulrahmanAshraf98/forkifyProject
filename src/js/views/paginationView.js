import View from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  constructor() {
    super(document.querySelector('.pagination'));
  }
  addPageHandler(handler) {
    this._parentElement.addEventListener('click', event => {
      event.preventDefault();
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    if (currentPage === 1 && numberOfPages > 1) {
      return this._generateButtonMarkup('next', currentPage);
    }
    if (currentPage === numberOfPages && numberOfPages > 1) {
      return this._generateButtonMarkup('prev', currentPage);
    }
    if (currentPage < numberOfPages) {
      return `${this._generateButtonMarkup(
        'next',
        currentPage
      )} ${this._generateButtonMarkup('prev', currentPage)}`;
    }
  }
  _generateButtonMarkup(type, currentPage) {
    const nextButton = `  <button class="btn--inline pagination__btn--next" data-goto="${
      currentPage + 1
    }">
     <span>${currentPage + 1}</span>
     <svg class="search__icon">
       <use href="${icons}#icon-arrow-right"></use>
     </svg>
   </button>`;
    const prevButton = `<button class="btn--inline pagination__btn--prev"data-goto="${
      currentPage - 1
    }">
   <svg class="search__icon">
     <use href="${icons}#icon-arrow-left"></use>
   </svg>
   <span>${currentPage - 1}</span>
 </button>`;
    return type === 'next' ? nextButton : prevButton;
  }
}
export default new PaginationView();
