import { renderThumbnails } from './render-thumbnails.js';
import { savePostedPhotos } from './posted-photo-gallery.js';
import { showDataErrorMessage } from './alerts/get-data-error.js';
import { getData } from './api.js';
import { initImagePopup } from './popup/init-image-popup.js';
import { initImageUploadForm } from './upload-form/init-image-upload-form.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    savePostedPhotos(photos);
  })
  .catch(() => {
    showDataErrorMessage();
  });

initImagePopup();
initImageUploadForm();
