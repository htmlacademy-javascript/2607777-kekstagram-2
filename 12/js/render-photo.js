//import {photos} from './create-desc.js';
import { openBigPicture } from './render-big-photo.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderPhoto = (photos) => {
  photos.forEach((photo) => {
    const thumbnail = template.cloneNode(true);
    thumbnail.dataset.pictureId = photo.id;
    const image = thumbnail.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);
  container.addEventListener('click', (evt) => {
    const currentPictureNode = evt.target.closest('.picture');
    if (currentPictureNode) {
      openBigPicture(currentPictureNode.dataset.pictureId, photos);
    }
  });
};
