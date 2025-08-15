import { selectPluralForm } from './util.js';

export const HASHTAGS_FIELD = 'hashtags';
export const DESCRIPTION_FIELD = 'description';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_HASHTAG = 20;
const MAX_SYMBOLS_COMMENT = 140;
const TEXT_LENGTH_MUST_BE_LESS_OR_EQUAL = 'Длина текста должна быть меньше или равна 140 символов';
const HASHTAG_CANNOT_CONSIST_OF_ONLY_HASH = 'Хештег не может состоять только из одной решетки';
const HASHTAGS_SEPARATED_BY_SPACES = 'Хештеги разделяются пробелами';
const HASHTAGS_MUST_START_WITH_HASH = 'Хештег должен начинаться с символа "#"';
const HASHTAGS_SHOULD_NOT_REPEATED = 'Хештеги не должны повторяться';
const MAXIMUM_LENGTH_SHOULD_BE = `Максимальная длина одного хештега ${MAX_SYMBOLS_HASHTAG} символов, включая решетку`;
const CANNOT_SPECIFY_MORE_HASHTAGS = `Нельзя указать больше ${MAX_HASHTAGS}`;
const HASHTAG_CONTAINS_INVALID_CHARACTERS = 'Хештег содержит недопустимые символы';

const errors = {
  [HASHTAGS_FIELD]: '',
  [DESCRIPTION_FIELD]: ''
};

export const getErrorByField = (field) => () => errors[field];

export const isHashtagsValid = (value) => {
  errors[HASHTAGS_FIELD] = '';

  if (!value.trim()) {
    return true;
  }

  const hashTags = value
    .toLowerCase()
    .trim()
    .split(/\s+/);

  const rules = [
    {
      isInvalid: () => hashTags.some((item) => item === '#'),
      error: HASHTAG_CANNOT_CONSIST_OF_ONLY_HASH,
    },
    {
      isInvalid: () => hashTags.some((item) => item.slice(1).includes('#')),
      error: HASHTAGS_SEPARATED_BY_SPACES,
    },
    {
      isInvalid: () => hashTags.some((item) => item[0] !== '#'),
      error: HASHTAGS_MUST_START_WITH_HASH,
    },
    {
      isInvalid: () =>
        hashTags.some((item, num, array) => array.includes(item, num + 1)),
      error: HASHTAGS_SHOULD_NOT_REPEATED,
    },
    {
      isInvalid: () =>
        hashTags.some((item) => item.length > MAX_SYMBOLS_HASHTAG),
      error: MAXIMUM_LENGTH_SHOULD_BE,
    },
    {
      isInvalid: () => hashTags.length > MAX_HASHTAGS,
      error: `${CANNOT_SPECIFY_MORE_HASHTAGS} ${selectPluralForm(
        MAX_HASHTAGS,
        'хештега',
        'хештегов',
        'хештегов'
      )}`,
    },
    {
      isInvalid: () =>
        hashTags.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
      error: HASHTAG_CONTAINS_INVALID_CHARACTERS,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.isInvalid();
    if (isInvalid) {
      errors[HASHTAGS_FIELD] = rule.error;
    }
    return !isInvalid;
  });
};

export const isDescriptionValid = (value) => {
  errors[DESCRIPTION_FIELD] = '';

  if (!value) {
    return true;
  }

  const isValid = value.length < MAX_SYMBOLS_COMMENT;
  if (!isValid) {
    errors[DESCRIPTION_FIELD] = TEXT_LENGTH_MUST_BE_LESS_OR_EQUAL;
  }

  return isValid;
};
