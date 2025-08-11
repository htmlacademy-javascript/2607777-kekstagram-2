const isEscapeKey = (evt) => evt.key === 'Escape';

const selectPluralForm = (count, nominative, genitiveSingular, genitivePlural) => {
  if (count % 10 === 0 || count % 100 > 4 && count & 100 < 21){
    return genitivePlural;
  }
  return count % 10 === 1
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

export {isEscapeKey, selectPluralForm, debounce};
