import { async } from 'regenerator-runtime';
import { API_KEY, API_URL, RESULT_PER_PAGE } from './config';
import { fetchData } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: {},
    result: [],
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};
export const loadRecipe = async id => {
  try {
    const URL = `${API_URL}/${id}?key=${API_KEY}`;
    const responseData = await fetchData(URL);
    const { recipe } = responseData.data;
    state.recipe = recipe;
    if (state.bookmarks.some(bookmarkRecipe => bookmarkRecipe.id === id))
      state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  } catch (error) {
    throw error;
  }
};
export const loadSearchResults = async query => {
  state.search.query = query;
  try {
    const URL = `${API_URL}/?search=${query}&key=${API_KEY}`;
    const responseData = await fetchData(URL);
    const { recipes } = responseData.data;
    state.search.result = recipes;
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPerPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
};

export const updateServings = async newServings => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmark = true;
  }
  persistBookmarks();
};
export const deleteBookmark = id => {
  const newBookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);
  state.bookmarks = newBookmarks;
  state.recipe.bookmark = false;
  persistBookmarks();
};
export const uploadRecipe = async newRecipe => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingredientValues = ingredient[1]
          .replaceAll(' ', '')
          .split(',')
          .map(element => element.trim());
        if (ingredientValues.length !== 3)
          throw new Error('wrong ingredient format ');
        const [quantity, unit, description] = ingredientValues;
        return { quantity: +quantity || null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const URL = `${API_URL}?key=${API_KEY}`;
    console.log(URL);
    const data = await fetchData(URL, { bodyData: recipe });
    state.recipe = data;
    addBookmark(state.recipe);
    console.log(data);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
