import Pristine from 'pristinejs';
import { isEscapeKey } from './util.js';
import {
  getErrorByField,
  isHashtagsValid,
  isDescriptionValid,
  HASHTAGS_FIELD,
  DESCRIPTION_FIELD
} from './validator.js';
import { applyEffect } from './slider-effects.js';
import { sendData } from './api.js';
import { showSuccess, showErrorSending } from './messages.js';

const SCALE_STEP = 0.25;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const img = form.querySelector('.img-upload__preview img');
const imgEffectsPreview = document.querySelectorAll('.effects__preview');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effects = form.querySelector('.effects__list');
const cancelButton = form.querySelector('.img-upload__cancel');
const smallerButton = form.querySelector('.scale__control--smaller');
const biggerButton = form.querySelector('.scale__control--bigger');
const imgSubmitButton = overlay.querySelector('.img-upload__submit');
const imgUploadButton = form.querySelector('.img-upload__input');
const scaleControl = form.querySelector('.scale__control--value');
const hashtagInput = form.querySelector('.text__hashtags');
const imgUploadFileInput = form.querySelector('#upload-file');
const descriptionInput = form.querySelector('.text__description');

let currentScale = 1;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const setImageScale = (scale) => {
  img.style.transform = `scale(${scale})`;
  scaleControl.value = `${scale * 100}%`;
};

const scaleDownImage = () => {
  if (currentScale > SCALE_STEP) {
    currentScale -= SCALE_STEP;
    setImageScale(currentScale);
  }
};

const scaleUpImage = () => {
  if (currentScale < 1) {
    currentScale += SCALE_STEP;
    setImageScale(currentScale);
  }
};

const closeForm = () => {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  currentScale = 1;
  setImageScale(currentScale);
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  form.reset();
  document.removeEventListener('keydown', handleKeyDown);
  cancelButton.removeEventListener('click', closeForm);
  pristine.reset();
};

function handleKeyDown(evt) {
  if (
    isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeForm();
  }
}

const openForm = () => {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');
  cancelButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', handleKeyDown);
};

form.addEventListener('input', () => {
  const isValid = pristine.validate(true);
  imgSubmitButton.disabled = !isValid;
});

const handleFileUpload = () => {
  const file = imgUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);
  if (matches) {
    const url = URL.createObjectURL(file);
    img.src = url;
    imgEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }
  openForm();
};

imgSubmitButton.disabled = !pristine.validate();

pristine.addValidator(hashtagInput, isHashtagsValid, getErrorByField(HASHTAGS_FIELD), 2, false);
pristine.addValidator(descriptionInput, isDescriptionValid, getErrorByField(DESCRIPTION_FIELD), 2, false);
imgUploadFileInput.addEventListener('change', handleFileUpload);
smallerButton.addEventListener('click', scaleDownImage);
biggerButton.addEventListener('click', scaleUpImage);
effects.addEventListener('change', applyEffect);

const blockSubmitButton = () => {
  imgSubmitButton.disabled = true;
  imgSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgSubmitButton.disabled = false;
  imgSubmitButton.textContent = 'Опубликовать';
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  sendData(new FormData(evt.target)).then((error) => {
    unblockSubmitButton();
    document.removeEventListener('keydown', handleKeyDown);
    if (error) {
      showErrorSending();
      return;
    }
    imgUploadFileInput.value = '';
    closeForm();
    showSuccess();
  });
};
form.addEventListener('submit', handleSubmit);
