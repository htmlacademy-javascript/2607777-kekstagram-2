//import { photos } from './create-desc.js';
import { clearComments, renderComments } from './render-comments-photo.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = () =>{
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

const onEscKeyDown = (evt) =>{
  if (evt.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const closeBigPicture = () =>{
  clearComments();

  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeyDown);
};

export const openBigPicture = (pictureId, photos) =>{
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  bigPictureImgNode.src = currentPhoto.url;
  likesCountNode.textContent = currentPhoto.likes;
  commentsCaptionNode.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeyDown);
};

