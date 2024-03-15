import { isEscapeKey } from './util.js';
import { getPhotoById, renderComments, renderPopupContent } from './image-popup-content-render.js';

const picturesContainer = document.querySelector('.pictures');
const imagePopup = document.querySelector('.big-picture');
const exitImagePopup = imagePopup.querySelector('#picture-cancel');
const commentsLoader = imagePopup.querySelector('.comments-loader');

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePopupImage ();
  }
};

function openPopupImage () {
  imagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeydown);
}

function closePopupImage () {
  imagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscKeydown);
}

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const targetThumbnail = evt.target.closest('[data-photo-id]');
    const openPhotoId = Number(targetThumbnail.dataset.photoId);

    commentsLoader.dataset.photoId = openPhotoId;

    renderPopupContent(getPhotoById(openPhotoId));
    openPopupImage();
  }
});

exitImagePopup.addEventListener('click', () => {
  closePopupImage();
});

commentsLoader.addEventListener('click', () => {
  const openPhotoId = Number(commentsLoader.dataset.photoId);
  renderComments(openPhotoId, true);
});
