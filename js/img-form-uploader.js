import Pristine from 'pristinejs';
import {isEscapeKey} from './util.js';
import {getError, isHashtagsValid, isDescriptionValid} from './validator.js';
import {applyEffect} from './slider-effects.js';
import { sendData } from './api.js';
import { showSuccess, showErrorSending } from './messages.js';

const SCALE_STEP = 0.25;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const img = imgUploadForm.querySelector('.img-upload__preview img');
const imgEffectsPreview = document.querySelectorAll('.effects__preview');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectList = imgUploadForm.querySelector('.effects__list');
const imgUploadCancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const smallerButton = imgUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imgUploadForm.querySelector('.scale__control--bigger');
const imgSubmitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const imgUploadButton = imgUploadForm.querySelector('.img-upload__input');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const imgUploadFileInput = imgUploadForm.querySelector('#upload-file');
const descriptionInput = imgUploadForm.querySelector('.text__description');

let currentScale = 1;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass : 'img-upload__field-wrapper--error',
});

const setImageScale = (scale) => {
  img.style.transform = `scale(${scale})`;
  scaleControl.value = `${scale * 100}%`;
};

const scaleDownImage = () => {
  if(currentScale > SCALE_STEP){
    currentScale -= SCALE_STEP;
    setImageScale(currentScale);
  }
};

const scaleUpImage = () => {
  if(currentScale < 1){
    currentScale += SCALE_STEP;
    setImageScale(currentScale);
  }
};

const closeUploadImg = () =>{
  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  currentScale = 1;
  setImageScale(currentScale);
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  imgUploadForm.reset();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', escapeKeydown);
};

const escapeKeydown = (evt) =>{
  if(isEscapeKey(evt)
  && !evt.target.classList.contains('text__hashtags')
  && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeUploadImg();
  }
};

const selectPhoto = () =>{
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  imgUploadCancelButton.addEventListener('click', closeUploadImg);
  document.addEventListener('keydown', escapeKeydown);
};

imgUploadForm.addEventListener('input', () => {
  const isValid = pristine.validate(true);
  imgSubmitButton.disabled = !isValid;
});

const handleFileUpload = () =>{
  const file = imgUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);
  if(matches) {
    const url = URL.createObjectURL(file);
    img.src = url;
    imgEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }else {
    return;
  }
  selectPhoto();
};

imgSubmitButton.disabled = !pristine.validate();

pristine.addValidator(hashtagInput, isHashtagsValid, getError, 2, false);
pristine.addValidator(descriptionInput, isDescriptionValid, getError, 2, false);
imgUploadFileInput.addEventListener('change', handleFileUpload);
smallerButton.addEventListener('click', scaleDownImage);
biggerButton.addEventListener('click', scaleUpImage);
effectList.addEventListener('change', applyEffect);

const blockSubmitButton = () => {
  imgSubmitButton.disabled = true;
  imgSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgSubmitButton.disabled = false;
  imgSubmitButton.textContent = 'Опубликовать';
};

const handleSubmit = (evt) =>{
  evt.preventDefault();
  blockSubmitButton();
  sendData(new FormData(evt.target))
    .then((err) => {
      unblockSubmitButton();
      document.removeEventListener('keydown', escapeKeydown);

      if (err) {
        showErrorSending();
        return;
      }
      imgUploadFileInput.value = '';
      closeUploadImg();
      showSuccess();
    });
};
imgUploadForm.addEventListener('submit', handleSubmit);
