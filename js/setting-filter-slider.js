const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');

const imagePreview = document.querySelector('.img-upload__preview img');

const effectLevel = document.querySelector('.effect-level__value');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const filterSettings = {
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

const getCurrentEffect = () => document.querySelector('.effects__radio:checked').value;

const getFilterValue = (effect, level) => {
  const filter = filterSettings[effect];
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

const changeSliderVisibility = () => {
  const effect = getCurrentEffect();

  if (filterSettings[effect].hidden) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

slider.noUiSlider.on('update', () => {
  effectLevel.value = slider.noUiSlider.get();
  setFilter(getCurrentEffect(), effectLevel.value);
});

const updateSliderOptions = (evt) => {
  const filter = filterSettings[evt.target.value];

  slider.noUiSlider.updateOptions({
    range: {
      min: filter.range.min,
      max: filter.range.max,
    },
    start: filter.start,
    step: filter.step,
  });
};

export { resetFilter, updateSliderOptions, changeSliderVisibility };

