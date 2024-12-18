export const debounce = (callback, delay = 300) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
