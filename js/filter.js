import {debounce} from './util.js';
import { renderPhoto } from './render-photo.js';

const FILTER = {
  default:'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

let currentFilter = FILTER.default;

const filterPanel = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRender = debounce(renderPhoto);

const applyFilter = (photos) => {
  let filteredPictures = [];
  if(currentFilter === FILTER.default) {
    filteredPictures = photos;
  }
  if(currentFilter === FILTER.random) {
    filteredPictures = photos.toSorted(() => 0.5 - Math.random()).slice(0, 10);
  }
  if(currentFilter === FILTER.discussed) {
    filteredPictures = photos.toSorted((a,b) => b.comments.length - a.comments.length);
  }
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
  currentFilter = targetButton.getAttribute('id');
  applyFilter(photos);
};

export const initFilter = (photos) => {
  filterPanel.classList.remove('img-filters--inactive');
  filterPanel.addEventListener('click', getHandleFilter(photos));
};
