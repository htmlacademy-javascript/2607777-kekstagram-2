import { renderPhotos } from './render-photo.js';
import './img-form-uploader.js';
import { getData } from './api.js';
import { showErrorGetting } from './messages.js';
import { initFilter, setPhotos } from './filter.js';

initFilter(renderPhotos);
getData().then((response) => {
  if (response.hasError) {
    showErrorGetting();
    return;
  }
  const { data = [] } = response;
  setPhotos(data);
});
