import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './util.js';

const filtersContainer = document.querySelector('.img-filters ');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const RANDOM_THUMBNAILS_TO_SHOW = 10;
const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';

const debounceRenderThumbnails = debounce(renderThumbnails);

const applyFilters = (photos, target) => {
  let filteredPhotos = [];

  switch (target.id) {
    case FILTER_DEFAULT:
      filteredPhotos = photos;
      break;
    case FILTER_RANDOM:
      filteredPhotos = photos.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_THUMBNAILS_TO_SHOW);
      break;
    case FILTER_DISCUSSED:
      filteredPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
      break;
  }
  debounceRenderThumbnails(filteredPhotos);
};

const highlightsButton = (target) => {
  const filtersButtons = filtersContainer.querySelectorAll('.img-filters__button');
  filtersButtons.forEach((button) => button.classList.remove(BUTTON_ACTIVE_CLASS));
  target.classList.add(BUTTON_ACTIVE_CLASS);
};

const setThumbnailsFilters = (photosData) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const activeButton = filtersContainer.querySelector(`.${BUTTON_ACTIVE_CLASS}`);
    const target = evt.target;

    if (!target.closest('.img-filters__button')) {
      return;
    }
    if (target === activeButton && !target.closest(`#${FILTER_RANDOM}`)) {
      return;
    }

    highlightsButton(target);
    applyFilters(photosData, target);
  });
};

export { setThumbnailsFilters };

