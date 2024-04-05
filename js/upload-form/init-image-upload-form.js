import { isEscapeKey } from '../util.js';
import { validateByPristine, resetValidation } from './validate-image-upload-form.js';
import { setImageUploadScale, resetImageScale } from './change-image-scale.js';
import { resetFilter} from './image-filters/using-filters.js';
import { setImageFilters, changeSliderVisibility } from './image-filters/noUiSlider-setting.js';
import { sendData } from '../api.js';
import { showMessage } from '../alerts/show-message-about-sending .js';
import { createImagePreview } from './image-preview.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const uploadFile = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const exitImageEditForm = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('#upload-submit');

const Message = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const {SUCCESS, ERROR} = Message;

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (evt.target === hashtagsField || evt.target === descriptionField) {
      return;
    }
    evt.preventDefault();
    closeEditForm();
  }
};

function openEditForm() {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeydown);
  changeSliderVisibility();
}

function closeEditForm() {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imageUploadForm.reset();

  resetFilter();
  resetValidation();
  resetImageScale();

  document.removeEventListener('keydown', onDocumentEscKeydown);
}

const blockSubmitButton = (needToBlock) => {
  if (needToBlock) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

const setUploadFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValidate = validateByPristine();

    if (isValidate) {
      blockSubmitButton(true);
      sendData(new FormData(evt.target))
        .then(() => {
          closeEditForm();
          showMessage(SUCCESS);
        })
        .catch(() => {
          showMessage(ERROR);
        })
        .finally(() => {
          blockSubmitButton(false);
        });
    }
  });
};

const initImageUploadForm = () => {
  uploadFile.addEventListener('change', () => {
    if (createImagePreview()) {
      openEditForm();
    }
  });

  exitImageEditForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeEditForm();
  });

  setImageUploadScale();
  setImageFilters();
  setUploadFormSubmit();
};

export { initImageUploadForm };
