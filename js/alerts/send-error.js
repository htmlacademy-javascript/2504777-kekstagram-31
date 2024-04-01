import { isEscapeKey } from '../util.js';

const templateErrorContent = document.querySelector('#error').content;
const templateError = templateErrorContent.querySelector('.error');

let errorMessage;

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    removeErrorMessage();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    removeErrorMessage();
  }
};

const addErrorMessage = () => {
  errorMessage = templateError.cloneNode(true);

  const closeButton = errorMessage.querySelector('.error__button');

  closeButton.addEventListener('click', () => {
    removeErrorMessage();
  });
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(errorMessage);
};

function removeErrorMessage () {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  errorMessage.remove();
}

export { addErrorMessage };
