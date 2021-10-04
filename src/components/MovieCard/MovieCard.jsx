import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import {
  trunc,
  formatRelease,
  getFullPosterPath,
  getRateColor
} from '../../libs';

import Context from '../../Context';
import mdb from '../../api';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const {
    state,
    dispatch,
    updateRated,
    updateStore,
    showAlert,
    FAIL_FETCH_MESSAGE
  } = useContext(Context);
  const { genres, rated } = state;
  const hasRated = rated.length;
  const { title, overview, genre_ids: genreIds, id } = movie;
  let {
    poster_path: posterPath,
    rating,
    release_date: releaseDate
  } = movie;

  releaseDate = releaseDate
    ? formatRelease(releaseDate)
    : 'unknown date, sorry';

  posterPath = posterPath
    ? getFullPosterPath(posterPath)
    : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';

  if (hasRated) {
    if (!rating) {
      const ratedList = rated;

      for (const ratedMovie of ratedList) {
        const movieIsRated = id === ratedMovie.id;

        if (movieIsRated) {
          rating = ratedMovie.rating;
          break;
        }
      }
    }
  }

  const [localRating, setLocalRating] = useState(rating || 0);

  const rateMovie = async (rate) => {
    try {
      const { guestSessionId } = state.session;
      await mdb.rate(guestSessionId, id, rate);
      showAlert(`"${title}" was rated 🎆 (${rate})`);
      setLocalRating(rate);
      const ratedIds = state.rated.map(({ id: ratedId }) => ratedId);

      if (ratedIds.includes(id)) {
        const { rated: ratedMovies } = state;
        const current = ratedMovies.find(({ id: ratedId }) => ratedId === id);

        current.rating = rate;
        return dispatch(updateStore({}));
      }

      return dispatch(updateRated({
        ...movie,
        rating: rate,
      }));
    } catch (error) {
      if (error.message === FAIL_FETCH_MESSAGE) showAlert('loading fail, check you connection!');
      return false;
    }
  };

  return (
    <div className="movie">
      <img
        className="movie__poster"
        src={posterPath}
        alt={title}
      />

      <div className="movie__textContent">
        <header className="movie__header">
          <h1 className="movie__title">{title}</h1>
          <div className="movie__ratingOutput" style={{
            border: `2px solid ${getRateColor(localRating)}`
          }}>
            {localRating}
          </div>
        </header>
        <div className="movie__release">{releaseDate}</div>
        <div className="movie__genres">
          {
            genres
              .filter(({ id: genreId }) => genreIds.includes(genreId))
              .map(({ name }) => (<div className="movie__genre" key={name}>{name}</div>))
          }
        </div>
        <p className="movie__overview">
          {trunc(overview, 30)}
        </p>
        <div className="movie__rating">
          <Rate
            count={10}
            value={localRating}
            allowHalf
            onChange={rateMovie}
          />
        </div>
      </div>
    </div>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.exact({
    adult: PropTypes.bool.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    backdrop_path: PropTypes.string,
    original_language: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    popularity: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    video: PropTypes.bool.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired
};


export default MovieCard;
