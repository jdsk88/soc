import { useState, useEffect } from "react";
export const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ""
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [localStorageKey, value]);

  return [value, setValue];
};
export const useStateWithLocalStorageArr = (localStorageKey) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || []
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value, setValue];
}; //obadać, do reuse

