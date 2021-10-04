import React, { useContext } from 'react';
import { Pagination } from 'antd';
import Context from '../../Context';
import mdb from '../../api';


const CustomPagination = () => {
  const {
    state,
    dispatch,
    updateSearchMovies,
    showAlert,
    FAIL_FETCH_MESSAGE
  } = useContext(Context);

  const paginationChangeHandler = async (page) => {
    try {
      const { searchQuery } = state;
      const loadedMovies = searchQuery
        ? await mdb.search(searchQuery, page)
        : await mdb.getPopular(page);

      dispatch(updateSearchMovies({ movies: loadedMovies, searchQuery }));
      window.scroll({ top: 0 });

    } catch (error) {
      if (error.message === FAIL_FETCH_MESSAGE) showAlert('loading fail, check you connection!');
    }
  };

  return (
    <>
      {
        state.openedTab === 'search' &&
        <div className='container centered'>
          <Pagination
            pageSize='20'
            current={state.search.page || 1}
            total={state.search.total_results || 1}
            onChange={paginationChangeHandler}
          />
        </div>
      }
    </>
  );
}

export default CustomPagination;
