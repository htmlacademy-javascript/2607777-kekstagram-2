import { debounce } from './util.js';
import { renderPhotos } from './render-photo.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const DEFAULT_FILTER = 'filter-default';
const RANDOM_FILTER = 'filter-random';
const DISCUSSED_FILTER = 'filter-discussed';
const RANDOM_FILTER_LIMIT = 10;

const filterPanel = document.querySelector('.img-filters');

const filterDefault = (photos) => photos;
const filterDiscused = (photos) =>
  photos.toSorted((a, b) => b.comments.length - a.comments.length);
const filterRandom = (photos) =>
  [...photos].sort(() => Math.random() - 0.5).slice(0, RANDOM_FILTER_LIMIT);

const Filters = {
  [DEFAULT_FILTER]: filterDefault,
  [RANDOM_FILTER]: filterRandom,
  [DISCUSSED_FILTER]: filterDiscused,
};

const filter = (photos, type) => {
  if (!photos.length) {
    return [];
  }
  const filterByType = Filters[type] || Filters.DEFAULT_FILTER;
  return filterByType(photos);
};

const state = {
  type: DEFAULT_FILTER,
  photos: [],
  debounceRender: null,
};

const handleFilter = (evt) => {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  state.type = targetButton.getAttribute('id');

  if (!state.photos.length) {
    return;
  }
  const filteredPictures = filter(state.photos, state.type);
  state.debounceRender(filteredPictures);
};

export const initFilter = (callback) => {
  state.debounceRender = debounce(callback);
  filterPanel.addEventListener('click', handleFilter);
};

export const setPhotos = (data) => {
  state.photos = [...data];
  state.type = DEFAULT_FILTER;
  renderPhotos(filter(state.photos, state.type));
  filterPanel.classList.remove('img-filters--inactive');
};
