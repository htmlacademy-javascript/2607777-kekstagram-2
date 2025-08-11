import {debounce} from './util.js';
import { renderPhotos } from './render-photo.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const Filter = {
  default:'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

let currentFilter = Filter.default;

const filterPanel = document.querySelector('.img-filters');

const debounceRender = debounce(renderPhotos);

const applyFilter = (photos) => {
  let filteredPictures = [];
  if(currentFilter === Filter.default) {
    filteredPictures = photos;
  }
  if(currentFilter === Filter.random) {
    filteredPictures = photos.toSorted(() => 0.5 - Math.random()).slice(0, 10);
  }
  if(currentFilter === Filter.discussed) {
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
