import { selectWordByCount } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_HASHTAG = 20;
const MAX_SYMBOLS_COMMENT = 140;


let getErrorMessage = '';

export const getError = () => getErrorMessage;

export const isHashtagsValid = (value) => {
  getErrorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const concatenatedTextInput = inputText.split(/\s+/);

  const rules = [
    {
      check:concatenatedTextInput.some((item) => item === '#'),
      error:'Хештег не может состоять только из одной решетки'
    },
    {
      check:concatenatedTextInput.some((item) => item.slice(1).includes('#')),
      error:'Хештеги разделяются пробелами'
    },
    {
      check:concatenatedTextInput.some((item) => item[0] !== '#'),
      error:'Хештег должен начинаться с символа \'#\''
    },
    {
      check:concatenatedTextInput.some((item, num, array) => array.includes(item, num + 1)),
      error:'Хештеги не должны повторяться'
    },
    {
      check:concatenatedTextInput.some((item) => item.length > MAX_SYMBOLS_HASHTAG),
      error:`Максимальная длина одного хештега ${MAX_SYMBOLS_HASHTAG} символов, включая решетку`
    },
    {
      check:concatenatedTextInput.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${selectWordByCount(
        MAX_HASHTAGS,'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check:concatenatedTextInput.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
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

export const isDescriptionValid = (value) =>{
  getErrorMessage = '';

  if(!value) {
    return true;
  }

  const rule = {
    check: value.length >= MAX_SYMBOLS_COMMENT,
    error:'Длина текста должна быть меньше или равна 140 символов'
  };
  const isInvalid = rule.check;
  if(isInvalid) {
    getErrorMessage = rule.error;
  }
  return !isInvalid;

};
