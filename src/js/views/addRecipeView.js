import View from './view';

class addRecipeView extends View {
  constructor() {
    super(document.querySelector('.upload'));
    this._window = document.querySelector('.add-recipe-window');
    this._overlay = document.querySelector('.overlay');
    this._btnOpenTheModal = document.querySelector('.nav__btn--add-recipe');
    this._btnCloseTheModal = document.querySelector('.btn--close-modal');
    this.ToggleWindowHandler();
    this.hiddenWindowHandler();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  ToggleWindowHandler() {
    this._btnOpenTheModal.addEventListener(
      'click',
      this.toggleWindow.bind(this)
    );
  }
  hiddenWindowHandler() {
    this._btnCloseTheModal.addEventListener(
      'click',
      this.toggleWindow.bind(this)
    );
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  submitHandler(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = [...new FormData(this)];
      const recipeData = Object.fromEntries(data);
      handler(recipeData);
    });
  }

  _generateMarkup() {}
}
export default new addRecipeView();
