import { renderPhotos } from './render-photo.js';
import './img-form-uploader.js';
import { getData } from './api.js';
import { showErrorGetting } from './messages.js';
import { initFilter, setPhotos } from './filter.js';

getData().then((response) => {
  if (response.hasError) {
    showErrorGetting();
    return;
  }
  initFilter(renderPhotos);
  const { data = [] } = response;
  setPhotos(data);
});
