const imageScale = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const imageUploadScale = document.querySelector('.scale');

const ScaleSettings = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
};

const {STEP, MIN, MAX, DEFAULT} = ScaleSettings;

let currentImageScale = DEFAULT;

const setScaleStyle = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
};

const doScaleSmaller = () => {
  if (currentImageScale > MIN) {
    currentImageScale -= STEP;
    imageScale.value = `${currentImageScale}%`;
    setScaleStyle(currentImageScale);
  }
};

const doScaleBigger = () => {
  if (currentImageScale < MAX) {
    currentImageScale += STEP;
    imageScale.value = `${currentImageScale}%`;
    setScaleStyle(currentImageScale);
  }
};

const resetImageScale = () => {
  imageScale.value = `${DEFAULT}%`;
  setScaleStyle(DEFAULT);
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
