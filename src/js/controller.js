import 'core-js/stable/';
import 'regenerator-runtime/runtime';

import {
  addBookmark,
  deleteBookmark,
  getSearchResultPerPage,
  loadRecipe,
  loadSearchResults,
  state,
  updateServings,
  uploadRecipe,
} from './model';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';
import addRecipeView from './views/addRecipeView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultView.update(getSearchResultPerPage());
    bookmarkView.update(state.bookmarks);
    await loadRecipe(id);
    recipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderErrorMessage(error.message);
  }
};
const controlSearchResult = async () => {
  resultView.renderSpinner();
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await loadSearchResults(query);
    resultView.render(getSearchResultPerPage());

    paginationView.render(state.search);
  } catch (error) {
    console.log(error.message);
  }
};
const controlPagePagination = page => {
  //render new resultView
  resultView.render(getSearchResultPerPage(page));
  //render new paginationView
  paginationView.render(state.search);
};
const controlServings = newServings => {
  // update the recipe servings (in state)
  updateServings(newServings);

  //update the recipe view
  recipeView.update(state.recipe);
};

const controlBookmark = () => {
  if (!state.recipe.bookmark) {
    addBookmark(state.recipe);
  } else if (state.recipe.bookmark) {
    deleteBookmark(state.recipe.id);
  }
  recipeView.update(state.recipe);
  bookmarkView.render(state.bookmarks);
};
const controlLoadBookMarksLocalStorage = () => {
  bookmarkView.render(state.bookmarks);
};
const controllerAddNewRecipe = async newRecipeData => {
  try {
    addRecipeView.renderSpinner();
    await uploadRecipe(newRecipeData);
    recipeView.render(state.recipe);
    addRecipeView.toggleWindow();
    bookmarkView.render(state.bookmarks);
    window.history.pushState(null, '', `#${state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderErrorMessage(err.message);
  }
};
const init = () => {
  bookmarkView.addLoadBookmarkViewHandler(controlLoadBookMarksLocalStorage);
  recipeView.addRenderHandler(controlRecipes);
  recipeView.updateServingsHandler(controlServings);
  recipeView.bookmarkRecipeHandler(controlBookmark);
  searchView.addSearchHandler(controlSearchResult);
  paginationView.addPageHandler(controlPagePagination);
  addRecipeView.submitHandler(controllerAddNewRecipe);
};
init();
