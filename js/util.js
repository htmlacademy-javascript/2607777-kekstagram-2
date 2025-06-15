const getRandomNumber = (min, max) =>{
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomItem = (items) => items [getRandomNumber(0, items.length - 1)];

export {getRandomNumber, getRandomItem};
