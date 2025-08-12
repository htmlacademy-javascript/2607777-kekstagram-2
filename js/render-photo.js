import { openBigPhoto } from './render-big-photo.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
let currentPhotos = [];

const clearPhotos = () => {
  document.querySelectorAll('a.picture').forEach((item) => item.remove());
};

const handlePhotoClick = (evt) => {
  const targetPhoto = evt.target.closest('.picture');
  const id = Number(targetPhoto.dataset.pictureId);
  const photo = currentPhotos.find((p) => p.id === id);
  if (photo) {
    openBigPhoto(photo);
  }
};


export const renderPhotos = (photos) => {
  clearPhotos();
  currentPhotos = photos;

  currentPhotos.forEach((photo) => {
    const thumbnail = photoTemplate.cloneNode(true);
    thumbnail.dataset.pictureId = photo.id;
    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.addEventListener('click', handlePhotoClick);
    fragment.appendChild(thumbnail);
  });
  photosContainer.appendChild(fragment);
};
