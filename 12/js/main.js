import {renderPhoto} from './render-photo.js';
import './img-form-uploader.js';
import { getData } from './api.js';
//import {showAlert} from './util.js';
import { showErrorGet } from './response.js';

//import { photos } from './create-desc.js';
getData(renderPhoto, showErrorGet);

