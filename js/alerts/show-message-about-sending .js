import { isEscapeKey } from '../util.js';

let message;
let sendingResult;

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    removeMessage();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest(`.${sendingResult}__inner`)) {
    removeMessage();
  }
};

const showMessage = (result) => {
  sendingResult = result;
  const templateContent = document.querySelector(`#${result}`).content;
  const template = templateContent.querySelector(`.${result}`);

  message = template.cloneNode(true);

  const closeButton = message.querySelector(`.${result}__button`);

  closeButton.addEventListener('click', () => {
    removeMessage();
  });
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(message);
};

function removeMessage () {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  message.remove();
}

export { showMessage };
