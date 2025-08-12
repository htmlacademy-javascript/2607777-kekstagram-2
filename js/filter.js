import { debounce } from './util.js';
import { renderPhotos } from './render-photo.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const filterDefault = (photos) => photos;
const filterDiscused = (photos) =>
  photos.toSorted((a, b) => b.comments.length - a.comments.length);
const filterRandom = (photos) =>
  photos.toSorted(() => 0.5 - Math.random()).slice(0, 10);

const Filters = {
  [FILTER_DEFAULT]: filterDefault,
  [FILTER_RANDOM]: filterRandom,
  [FILTER_DISCUSSED]: filterDiscused,
};

const filterPanel = document.querySelector('.img-filters');

const debounceRender = debounce(renderPhotos);

const applyFilter = (photos, filter) => {
  const filteredPictures = Filters[filter || FILTER_DEFAULT](photos);
  debounceRender(filteredPictures);
};

const getHandleFilter = (photos) => (evt) => {
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
  const filter = targetButton.getAttribute('id');
  applyFilter(photos, filter);
};

export const initFilter = (photos) => {
  filterPanel.classList.remove('img-filters--inactive');
  filterPanel.addEventListener('click', getHandleFilter(photos));
};
