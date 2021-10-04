import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Spin } from 'antd';
import Nav from 'comps/Nav';
import SearchInput from 'comps/SearchInput';
import MovieList from 'comps/MovieList';
import Pagination from 'comps/Pagination';
import Alert from 'comps/Alert';
import mdb from './api';
import Context from './Context';

import {
  rootReducer,
  initialState
} from './store';

import {
  updateStore,
  updateSearchMovies,
  updateRated,
  openTab,
} from './store/actions';

const FAIL_FETCH_MESSAGE = 'Failed to fetch';

const App = () => {
  // глобальное состояние
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // этап монтирования
  useEffect(() => {
    const init = async () => {
      const session = await mdb.createSession();
      const genres = await mdb.getGenres();
      const { results: rated } = await mdb.getRated(session.guestSessionId);
      const search = await mdb.getPopular();

      dispatch(updateStore({
        session,
        genres,
        rated,
        search,
        openedTab: 'search',
      }));
    };

    init();
  }, []);

  // состояние модалки (показать, сообщение модалки)
  const [alert, setAlert] = useState({
    showed: false,
    message: ''
  });

  // показать модалку
  const showAlert = (message) => {
    setAlert(prev => ({
      ...prev,
      message,
      showed: true
    }));

    setTimeout(() => {
      setAlert(prev => ({
        ...prev,
        showed: false
      }))
    }, 2000);
  };

  // были ли загружены начальные данные ( сессия, популярные фильмы )
  const startLoadingSuccess = useMemo(() => 'results' in state.search, [state]);

  const contextValue = {
    state,
    dispatch,
    updateStore,
    updateSearchMovies,
    updateRated,
    openTab,
    showAlert,
    FAIL_FETCH_MESSAGE
  };

  return (
    <Context.Provider value={contextValue}>
      {/* основной макет */}
      {startLoadingSuccess &&
        <>
          {alert.showed ? <Alert message={alert.message} /> : null}
          <Nav />
          <SearchInput />
          <MovieList />
          <Pagination />
        </>}
      {/* загрузчик */}
      {startLoadingSuccess ||
        <Spin style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
          size='large'
        />}
    </Context.Provider>
  );
}

export default App;
