import { openBigPicture } from './render-big-photo.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const clearPhotos = () => {
  document.querySelectorAll('a.picture').forEach((item) => item.remove());
};

let currentPhotos = [];

const onPictureClick = (evt) => {
  const target = evt.target.closest('.picture');
  if (!target) {
    return;
  }

  const id = Number(target.dataset.pictureId);
  const photo = currentPhotos.find((p) => p.id === id);
  if (photo) {
    openBigPicture(photo);
  }
};

export const renderPhoto = (photos) => {
  clearPhotos();
  currentPhotos = photos;

  currentPhotos.forEach((photo) => {
    const thumbnail = template.cloneNode(true);
    thumbnail.dataset.pictureId = photo.id;
    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
  container.addEventListener('click',onPictureClick);
};
