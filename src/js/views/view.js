import icons from 'url:../../img/icons.svg';

export default class View {
  constructor(parentElement) {
    this._parentElement = parentElement;
    this._data = null;
  }
  render(data) {
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderErrorMessage();
    this._data = data;

    const recipeMarkup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', recipeMarkup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOm = document.createRange().createContextualFragment(newMarkup);
    const newDomElements = Array.from(newDOm.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newDomElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild &&
        newElement.firstChild.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute => {
          currentElement.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }
  renderSpinner() {
    const spinnerMarkup = `<div class="spinner">
        <svg>
          <use href=${icons}#icon-loader></use>
        </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }
  renderErrorMessage(message = this._errorMessage) {
    const errorMarkup = ` <div class="error">
   <div>
     <svg>
       <use href="${icons}#icon-alert-triangle"></use>
     </svg>
   </div>
   <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
