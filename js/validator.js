import { selectPluralForm } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_HASHTAG = 20;
const MAX_SYMBOLS_COMMENT = 140;
const TEXT_LENGTH_MOST_BE_LESS_OR_EQUAL = 'Длина текста должна быть меньше или равна 140 символов';

//let errorMessage = '';

const errors = {
  hashtags: '',
  description: ''
};

export const getError = () => Object.values(errors).filter(Boolean).join(' и ');


export const isHashtagsValid = (value) => {
  errors.hashtags = '';
  const isDescriptonError = !errors.description.length;

  const inputText = value.toLowerCase().trim();

  if (!value.trim()) {
    return isDescriptonError;
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
      errors.hashtags = rule.error;
    }
    return !isInvalid;
  }) && isDescriptonError;
};

export const isDescriptionValid = (value) => {
  errors.description = '';
  const isHashtagsError = !errors.hashtags.length;
  if (!value) {
    return isHashtagsError;
  }

  const isInvalid = value.length >= MAX_SYMBOLS_COMMENT;
  if (isInvalid) {
    errors.description = TEXT_LENGTH_MOST_BE_LESS_OR_EQUAL;
  }
  return !isInvalid && isHashtagsError;
};
