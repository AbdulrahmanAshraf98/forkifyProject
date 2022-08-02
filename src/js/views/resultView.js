import View from './view';
import icons from 'url:../../img/icons.svg';
class ResultView extends View {
  constructor() {
    super(document.querySelector('.results'));
    this._errorMessage = 'no data found';
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupView).join('');
  }
  _generateMarkupView(recipe) {
    const id = window.location.hash.slice(1);
    const recipeActiveClass = recipe.id === id ? 'preview__link--active' : '';
    return ` <li class="preview">
    <a class="preview__link ${recipeActiveClass}" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image_url}"  alt="${recipe.title}"/>
      </figure>
      <div class="preview__data">
        <h4 class="preview__title"> ${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher} </p>
        <div class="preview__user-generated">
          <svg>
            <use href=${icons}#icon-user></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}
export default new ResultView();
