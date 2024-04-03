const imagePreview = document.querySelector('.img-upload__preview img');

const filtersSettings = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'none',
    hidden: true,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'grayscale',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'sepia',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'brightness',
  },
};

const getFiltersSettings = () => filtersSettings;

const getFilterValue = (effect, level) => {
  const filter = filtersSettings[effect];
  if (effect === 'none') {
    return `${filter.style}`;
  }
  return `${filter.style}(${level}${filter.unit || ''})`;
};

const setFilter = (effect, effectLevelValue = 1) => {
  imagePreview.style.filter = getFilterValue(effect, effectLevelValue);
};

const resetFilter = () => {
  setFilter('none');
};

export { getFiltersSettings, setFilter, resetFilter };
