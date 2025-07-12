const getRandomNumber = (min, max) =>{
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomItem = (items) => items [getRandomNumber(0, items.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const numDecline = (num, nominative, genetiveSingular, genetivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num & 100 < 21){
    return genetivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genetiveSingular;
};

export {getRandomNumber, getRandomItem, isEscapeKey, numDecline};
