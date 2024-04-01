const imageScale = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const imageUploadScale = document.querySelector('.scale');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentImageScale = DEFAULT_SCALE;

const setScaleStyle = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
};

const doScaleSmaller = () => {
  if (currentImageScale > MIN_SCALE) {
    currentImageScale -= SCALE_STEP;
    imageScale.value = `${currentImageScale}%`;
    setScaleStyle(currentImageScale);
  }
};

const doScaleBigger = () => {
  if (currentImageScale < MAX_SCALE) {
    currentImageScale += SCALE_STEP;
    imageScale.value = `${currentImageScale}%`;
    setScaleStyle(currentImageScale);
  }
};

const resetImageScale = () => {
  imageScale.value = `${DEFAULT_SCALE}%`;
  setScaleStyle(DEFAULT_SCALE);
};

// Изменение масштаба загружаемой фотографии
const setImageUploadScale = () => {
  imageUploadScale.addEventListener('click', (evt) => {
    if (evt.target.closest('.scale__control--smaller')) {
      doScaleSmaller();
    } else if (evt.target.closest('.scale__control--bigger')) {
      doScaleBigger();
    }
  });
};


export { setImageUploadScale, resetImageScale };
