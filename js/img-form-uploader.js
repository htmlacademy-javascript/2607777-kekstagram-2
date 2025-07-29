import {isEscapeKey} from './util.js';
import {getError, isHashtagsValid, isCommentValid} from './validator.js';
import {applyEffect} from './slider-effects.js';
import { sendData } from './api.js';
import { showSuccess, showErrorSending } from './response.js';

const SCALE_STEP = 0.25;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const smallerButton = imgUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imgUploadForm.querySelector('.scale__control--bigger');
const img = imgUploadForm.querySelector('.img-upload__preview img');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectList = imgUploadForm.querySelector('.effects__list');
const inputHashtag = imgUploadForm.querySelector('.text__hashtags');
const inputText = imgUploadForm.querySelector('.text__description');
const imgButtonSubmit = uploadOverlay.querySelector('.img-upload__submit');

let scale = 1;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass : 'img-upload__field-wrapper--error',
});

const onImgUploadClose = () =>{
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  scale = 1;
  img.style.transform = `scale(${scale})`;
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  imgUploadForm.reset();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscapeKeydown);
};

const onEscapeKeydown = (evt) =>{
  if(isEscapeKey(evt)
  && !evt.target.classList.contains('text__hashtags')
  && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    onImgUploadClose();
  }
};

const onPhotoSelect = () =>{
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

const scaleDownImage = () => {
  if(scale > SCALE_STEP){
    scale -= SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const scaleUpImage = () => {
  if(scale < 1){
    scale += SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

imgUploadForm.addEventListener('input', () => {
  const isValid = pristine.validate();
  imgButtonSubmit.disabled = !isValid;
});

imgButtonSubmit.disabled = !pristine.validate();

pristine.addValidator(inputHashtag, isHashtagsValid, getError, 2, false);

pristine.addValidator(inputText, isCommentValid, getError, 2, false);

uploadFile.addEventListener('change', onPhotoSelect);

smallerButton.addEventListener('click', scaleDownImage);

biggerButton.addEventListener('click', scaleUpImage);

effectList.addEventListener('change', applyEffect);

const blockSubmitButton = () => {
  imgButtonSubmit.disabled = true;
  imgButtonSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgButtonSubmit.disabled = false;
  imgButtonSubmit.textContent = 'Опубликовать';
};

const handleSubmit = (evt) =>{
  evt.preventDefault();
  blockSubmitButton();
  /*
  sendData(
    () => {
      document.removeEventListener('keydown', onEscapeKeydown);
      unblockSubmitButton();
      showSuccess();
      uploadOverlay.classList.add('hidden');
    },
    () => {
      document.removeEventListener('keydown', onEscapeKeydown);
      showErrorSending();
      unblockSubmitButton();
    },
    new FormData(evt.target),
  );
  */
  sendData(new FormData(evt.target))
    .then((response) => {
      if (response.hasError) {
        document.removeEventListener('keydown', onEscapeKeydown);
        showErrorSending();
        unblockSubmitButton();
        return;
      }
      document.removeEventListener('keydown', onEscapeKeydown);
      unblockSubmitButton();
      showSuccess();
      uploadOverlay.classList.add('hidden');
    });
};

imgUploadForm.addEventListener('submit', handleSubmit);

