import { selectPluralForm } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_HASHTAG = 20;
const MAX_SYMBOLS_COMMENT = 140;

let errorMessage = '';

export const getError = () => errorMessage;

export const isHashtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!value.trim()) {
    return true;
  }

  const hashTags = inputText.split(/\s+/);

  const rules = [
    {
      isInvalid: () => hashTags.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      isInvalid: () => hashTags.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      isInvalid: () => hashTags.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа "#"',
    },
    {
      isInvalid: () =>
        hashTags.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      isInvalid: () =>
        hashTags.some((item) => item.length > MAX_SYMBOLS_HASHTAG),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS_HASHTAG} символов, включая решетку`,
    },
    {
      isInvalid: () => hashTags.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${selectPluralForm(
        MAX_HASHTAGS,
        'хештега',
        'хештегов',
        'хештегов'
      )}`,
    },
    {
      isInvalid: () =>
        hashTags.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.isInvalid();
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export const isDescriptionValid = (value) => {
  errorMessage = '';

  if (!value) {
    return true;
  }

  const rule = {
    check: value.length >= MAX_SYMBOLS_COMMENT,
    error: 'Длина текста должна быть меньше или равна 140 символов',
  };
  const isInvalid = rule.check;
  if (isInvalid) {
    errorMessage = rule.error;
  }
  return !isInvalid;
};
