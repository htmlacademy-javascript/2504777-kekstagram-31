
import { isEscapeKey } from '../util.js';

const templateSuccessContent = document.querySelector('#success').content;
const templateSuccess = templateSuccessContent.querySelector('.success');

let successMessage;

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    removeSuccessMessage();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    removeSuccessMessage();
  }
};

const addSuccessMessage = () => {
  successMessage = templateSuccess.cloneNode(true);

  const closeButton = successMessage.querySelector('.success__button');

  closeButton.addEventListener('click', () => {
    removeSuccessMessage();
  });
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(successMessage);
};

function removeSuccessMessage () {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  successMessage.remove();
}

export { addSuccessMessage };
