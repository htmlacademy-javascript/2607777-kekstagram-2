const ALERT_SHOW_TIME = 1000 * 5;

const getRandomNumber = (min, max) =>{
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomItem = (items) => items [getRandomNumber(0, items.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const selectWordByCount = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num & 100 < 21){
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomItem, isEscapeKey, selectWordByCount, showAlert};
