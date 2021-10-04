import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import Context from '../../Context';
import useDebounce from '../../hooks/useDebounce';
import mdb from '../../api';

const CustomInput = () => {
  const {
    state,
    dispatch,
    updateSearchMovies,
    showAlert,
    FAIL_FETCH_MESSAGE
  } = useContext(Context);
  const [value, setValue] = useState(() => state.searchQuery);
  const sendSearch = useDebounce(async (query) => {
    try {
      const loadedMovies = await mdb.search(query, 1);

      dispatch(updateSearchMovies({
        movies: loadedMovies,
        searchQuery: query,
      }));
    } catch (error) {
      if (error.message === FAIL_FETCH_MESSAGE) showAlert('loading fail, check you connection!');
    }
  }, 800);

  const changeHandler = ({ target }) => {
    const { value: targetValue } = target;
    setValue(targetValue);
  };

  useEffect(() => {
    if (value) sendSearch(value);
  }, [value, sendSearch]);

  return (
    <div className="container">
      <Input
        size='large'
        placeholder='Search movie...'
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
}

export default CustomInput;
