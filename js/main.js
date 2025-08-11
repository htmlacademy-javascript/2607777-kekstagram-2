import {renderPhotos} from './render-photo.js';
import './img-form-uploader.js';
import { getData } from './api.js';
import { showErrorGetting } from './messages.js';
import { initFilter } from './filter.js';

getData()
  .then((response) => {
    if (response.hasError) {
      showErrorGetting();
      return;
    }
    const { data = [] } = response;
    renderPhotos(data);
    initFilter(data);
  });

