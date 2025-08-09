const isEscapeKey = (evt) => evt.key === 'Escape';

const selectWordByCount = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num & 100 < 21){
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.call(this,rest);
    }, timeoutDelay);
  };
};

export {isEscapeKey, selectWordByCount, debounce};
