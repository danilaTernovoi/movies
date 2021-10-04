import { format } from 'date-fns';

export const formatRelease = (dateString) => {
  const [year, month, date] = dateString.split('-');
  const formatExpression = 'MMMM d, yyyy';
  return format(new Date(year, month, date), formatExpression);
};

export const getFullPosterPath = (posterPath) => `https://image.tmdb.org/t/p/w500${posterPath}`;

export const getRateColor = (rate) => {
  if (rate <= 3) return '#E90000';
  if (rate > 3 && rate <= 5) return '#E97E00';
  if (rate > 5 && rate <= 7) return '#E9D100';
  return '#66E900';
};

export const trunc = (text, cutTreshold, tail = '...') => {
  const splitBy = ' ';
  const wordsArray = text.split(splitBy);

  return wordsArray.length <= cutTreshold ? text : wordsArray.slice(0, cutTreshold).join(splitBy) + tail;
};
