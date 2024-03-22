import { isEscapeKey } from './util.js';
import { validateByPristine } from './validate-image-upload-form.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const uploadFile = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const exitImageEditForm = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');

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
}

function closeEditForm () {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtagsField.value = '';
  descriptionField.value = '';

  document.removeEventListener('keydown', onDocumentEscKeydown);
}

uploadFile.addEventListener('change', () => {
  openEditForm();
});

exitImageEditForm.addEventListener('click', () => {
  closeEditForm();
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidate = validateByPristine();

  if(isValidate) {
    console.log('Форма валидна'); //eslint-disable-line
  } else {
    console.log('Форма невалидна'); //eslint-disable-line
  }
});


