import { isEscapeKey } from './util.js';
import { validateByPristine, resetValidation } from './validate-image-upload-form.js';
import { doScaleSmaller, doScaleBigger, resetImageScale } from './change-image-scale.js';
import { resetFilter, updateSliderOptions, changeSliderVisibility } from './setting-filter-slider.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const uploadFile = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const exitImageEditForm = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');

const imageUploadScale = imageUploadForm.querySelector('.scale');

const filters = imageUploadForm.querySelector('.effects');

// Открытие/закрытие формы
const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (evt.target === hashtagsField || evt.target === descriptionField) {
      return;
    }
    evt.preventDefault();
    closeEditForm();
  }
};

/* Способ с использованием .stopPropagation()
hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
*/

function openEditForm () {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeydown);
  changeSliderVisibility();
}

function closeEditForm () {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imageUploadForm.reset();

  resetFilter();
  resetValidation();
  resetImageScale();

  document.removeEventListener('keydown', onDocumentEscKeydown);
}

uploadFile.addEventListener('change', () => {
  openEditForm();
});

exitImageEditForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeEditForm();
});

// Валидация формы
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidate = validateByPristine();

  if(isValidate) {
    console.log('Форма валидна'); //eslint-disable-line
  } else {
    console.log('Форма невалидна'); //eslint-disable-line
  }
});

// Изменение масштаба загружаемой фотографии
imageUploadScale.addEventListener('click', (evt) => {
  if (evt.target.closest('.scale__control--smaller')) {
    doScaleSmaller();
  } else if (evt.target.closest('.scale__control--bigger')) {
    doScaleBigger();
  }
});

// Наложение эфекта на изображение
filters.addEventListener('change', (evt) => {
  changeSliderVisibility();
  updateSliderOptions(evt);
});

