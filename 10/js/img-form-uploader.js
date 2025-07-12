import {isEscapeKey} from './util.js';
import {error, isHashtagsValid} from './hashtag-validator.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const inputHashtag = imgUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass : 'img-upload__field-wrapper--error',
});

const onImgUploadClose = () =>{
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
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

const onHashTagInput = () => {
  isHashtagsValid(inputHashtag.value);
};

pristine.addValidator(inputHashtag, isHashtagsValid, error, 2, false);

uploadFile.addEventListener('change', onPhotoSelect);

inputHashtag.addEventListener('change', onHashTagInput);
