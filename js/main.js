import { renderThumbnails } from './thumbnails/render-thumbnails.js';
import { savePostedPhotos } from './posted-photo-gallery.js';
import { showToastError } from './alerts/show-toast-error.js';
import { getData } from './api.js';
import { initImagePopup } from './popup/init-image-popup.js';
import { initImageUploadForm } from './upload-form/init-image-upload-form.js';
import { setThumbnailsFilters } from './thumbnails/thumbnails-filters.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    savePostedPhotos(photos);
    setThumbnailsFilters(photos);
  })
  .catch(() => {
    showToastError();
  });

initImagePopup();
initImageUploadForm();
