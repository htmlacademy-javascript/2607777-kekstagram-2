import {renderPhoto} from './render-photo.js';
import './img-form-uploader.js';
import { getData } from './api.js';
import { showErrorGetting } from './response.js';

getData(renderPhoto, showErrorGetting);

