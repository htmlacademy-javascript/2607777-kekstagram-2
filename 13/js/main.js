import {renderPhoto} from './render-photo.js';
import './img-form-uploader.js';
import { getData } from './api.js';
import { showErrorGetting } from './response.js';
import { initFilter } from './filter.js';

getData()
  .then((response) => {
    if (response.hasError) {
      showErrorGetting();
      return;
    }
    const { data = [] } = response;
    renderPhoto(data);
    initFilter(data);
  });

