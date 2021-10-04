import { UPDATE_STORE, UPDATE_SEARCH_MOVIES, UPDATE_RATED, OPEN_TAB } from './types';

export const initialState = {
  session: {},
  genres: [],
  search: {},
  rated: [],
  openedTab: '',
  searchQuery: '',
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STORE:
      return { ...state, ...action.payload };

    case UPDATE_SEARCH_MOVIES:
      return {
        ...state,
        search: action.payload.movies,
        searchQuery: action.payload.searchQuery,
      };

    case UPDATE_RATED:
      return {
        ...state,
        rated: [...state.rated, action.payload],
      };

    case OPEN_TAB:
      return {
        ...state,
        openedTab: action.payload,
      };

    default:
      return { ...state };
  }
};
