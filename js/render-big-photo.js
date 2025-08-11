import { clearComments, renderComments } from './render-comments-photo.js';
import { isEscapeKey } from './util.js';

const bigPhotoForm = document.querySelector('.big-picture');
const bigPhotoImgOverlay = bigPhotoForm.querySelector('.big-picture__img').querySelector('img');
const bigPhotolikesCount = bigPhotoForm.querySelector('.likes-count');
const bigPhotoCaption = bigPhotoForm.querySelector('.social__caption');
const bigPhotoCancelButton = bigPhotoForm.querySelector('.big-picture__cancel');

const bigPictureCancelClick = () =>{
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const handleKeydown = (evt) =>{
  isEscapeKey(evt);
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const closeBigPicture = () =>{
  clearComments();

  bigPhotoForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPhotoCancelButton.removeEventListener('click', bigPictureCancelClick);
  document.removeEventListener('keydown', handleKeydown);
};

export const openBigPhoto = (photo) =>{
  const currentPhoto = photo;
  bigPhotoImgOverlay.src = currentPhoto.url;
  bigPhotolikesCount.textContent = currentPhoto.likes;
  bigPhotoCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPhotoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPhotoCancelButton.addEventListener('click', bigPictureCancelClick);
  document.addEventListener('keydown', handleKeydown);
};
