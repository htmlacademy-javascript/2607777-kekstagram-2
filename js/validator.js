import { getCorrectFormWord } from './util.js';

const settings = {
  MAX_HASHTAGS: 5,
  MAX_SYMBOLS_HASHTAG : 20,
  MAX_SYMBOLS_COMMENT: 140
};

let getErrorMessage = '';

export const getError = () => getErrorMessage;

export const isHashtagsValid = (value) => {
  getErrorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check:inputArray.some((item) => item === '#'),
      error:'Хештег не может состоять только из одной решетки'
    },
    {
      check:inputArray.some((item) => item.slice(1).includes('#')),
      error:'Хештеги разделяются пробелами'
    },
    {
      check:inputArray.some((item) => item[0] !== '#'),
      error:'Хештег должен начинаться с символа \'#\''
    },
    {
      check:inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error:'Хештеги не должны повторяться'
    },
    {
      check:inputArray.some((item) => item.length > settings.MAX_SYMBOLS_HASHTAG),
      error:`Максимальная длина одного хештега ${settings.MAX_SYMBOLS_HASHTAG} символов, включая решетку`
    },
    {
      check:inputArray.length > settings.MAX_HASHTAGS,
      error: `Нельзя указать больше ${settings.MAX_HASHTAGS} ${getCorrectFormWord(
        settings.MAX_HASHTAGS,'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check:inputArray.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
      error:'Хештег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      getErrorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export const isCommentValid = (value) =>{
  getErrorMessage = '';

  if(!value) {
    return true;
  }

  const rule = {
    check: value.length >= settings.MAX_SYMBOLS_COMMENT,
    error:'Длина текста должна быть меньше или равна 140 символов'
  };
  const isInvalid = rule.check;
  if(isInvalid) {
    getErrorMessage = rule.error;
  }
  return !isInvalid;

};
