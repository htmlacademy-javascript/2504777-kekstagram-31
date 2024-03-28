import { renderThumbnails } from './render-thumbnails.js';
import { savePostedPhotos } from './posted-photo-gallery.js';
import { showDataErrorMessage } from './get-data-error.js';
import './image-popup-controller.js';
import './image-upload-form-controller.js';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error ('Не удалось загрузить данные');
    }
  })
  .then((photos) => {
    renderThumbnails(photos);
    savePostedPhotos(photos);
  })
  .catch(() => {
    showDataErrorMessage();
  });
