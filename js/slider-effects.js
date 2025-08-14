const imgUploadWrapperOverlay = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapperOverlay.querySelector('.effect-level__slider');
const effectLevelOverlay = imgUploadWrapperOverlay.querySelector(
  '.img-upload__effect-level'
);
const effectLevelValue = imgUploadWrapperOverlay.querySelector(
  '.effect-level__value'
);
const img = imgUploadWrapperOverlay.querySelector('.img-upload__preview');
const imgPosition = img.firstElementChild;

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  format: {
    to: (value) =>
      Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = Number(slider.noUiSlider.get());
});

effectLevelOverlay.classList.add('hidden');

export const applyEffect = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevelOverlay.classList.add('hidden');
  } else {
    effectLevelOverlay.classList.remove('hidden');
  }

  switch (effect) {
    case 'none':
      imgPosition.style.filter = 'none';
      break;
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPosition.style.filter = `grayscale(${effectLevelValue.value})`;
      });
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPosition.style.filter = `sepia(${effectLevelValue.value})`;
      });
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      slider.noUiSlider.on('update', () => {
        imgPosition.style.filter = `invert(${effectLevelValue.value}%)`;
      });
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPosition.style.filter = `blur(${effectLevelValue.value}px)`;
      });
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPosition.style.filter = `brightness(${effectLevelValue.value})`;
      });
  }
};
