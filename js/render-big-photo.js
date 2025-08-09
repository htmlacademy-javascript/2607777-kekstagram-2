import { clearComments, renderComments } from './render-comments-photo.js';

const bigPictureForm = document.querySelector('.big-picture');
const bigPictureImgOverlay = bigPictureForm.querySelector('.big-picture__img').querySelector('img');
const bigPicturelikesCount = bigPictureForm.querySelector('.likes-count');
const bigPictureCaption = bigPictureForm.querySelector('.social__caption');
const bigPictureCancelButton = bigPictureForm.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = () =>{
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const escapeKeydown = (evt) =>{
  if (evt.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const closeBigPicture = () =>{
  clearComments();

  bigPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelButton.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', escapeKeydown);
};

export const openBigPicture = (photo) =>{
  const currentPhoto = photo;
  bigPictureImgOverlay.src = currentPhoto.url;
  bigPicturelikesCount.textContent = currentPhoto.likes;
  bigPictureCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancelButton.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', escapeKeydown);
};
