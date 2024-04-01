import { getFiltersSettings, setFilter } from './using-filters.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const filters = document.querySelector('.effects');

const filtersSettings = getFiltersSettings();

const getCurrentEffect = () => document.querySelector('.effects__radio:checked').value;

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

const changeSliderVisibility = () => {
  const effect = getCurrentEffect();

  if (filtersSettings[effect].hidden) {
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
  const filter = filtersSettings[evt.target.value];

  slider.noUiSlider.updateOptions({
    range: {
      min: filter.range.min,
      max: filter.range.max,
    },
    start: filter.start,
    step: filter.step,
  });
};

const setImageFilters = () => {
  filters.addEventListener('change', (evt) => {
    changeSliderVisibility();
    updateSliderOptions(evt);
  });
};

export { changeSliderVisibility, setImageFilters };
