import React, { Fragment, useContext } from 'react';
import MovieCard from 'comps/MovieCard';
import Context from '../../Context';
import NoMovies from '../NoMovies';
import './MovieList.css';

const MovieList = () => {
  const { state } = useContext(Context);
  const currentView = (
    'results' in state[state.openedTab]
      ? state.search.results
      : state.rated
  );

  return (
    <div className='container movieList'>
      {currentView.length
        ? currentView.map(movie =>
        (<Fragment key={movie.id}>
          <MovieCard movie={movie} />
        </Fragment>)
        )
        : <NoMovies />}
    </div>
  );
};

export default MovieList;
