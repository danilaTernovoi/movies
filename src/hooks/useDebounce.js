import { useCallback } from 'react';
import { debounce } from 'lodash';

const useDebounce = (callback, msTime) => {
  const db = useCallback(debounce(callback, msTime), []);
  return db;
};

export default useDebounce;
