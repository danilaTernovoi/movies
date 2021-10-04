import { UPDATE_STORE, UPDATE_SEARCH_MOVIES, UPDATE_RATED, OPEN_TAB } from './types';

export const updateStore = (data) => ({ type: UPDATE_STORE, payload: data });
export const updateRated = (data) => ({ type: UPDATE_RATED, payload: data });
export const openTab = (tabName) => ({ type: OPEN_TAB, payload: tabName });
export const updateSearchMovies = (data) => ({
  type: UPDATE_SEARCH_MOVIES,
  payload: {
    movies: data.movies,
    searchQuery: data.searchQuery,
  },
});
