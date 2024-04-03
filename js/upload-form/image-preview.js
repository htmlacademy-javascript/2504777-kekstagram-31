import { showToastError } from '../alerts/show-toast-error.js';

const fileChooser = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];

const createImagePreview = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((elem) => fileName.endsWith(elem));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((elem) => {
      elem.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    return true;
  }
  showToastError('Неверный тип файла');
  return false;
};

export { createImagePreview };
