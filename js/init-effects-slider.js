const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');

const imagePreview = document.querySelector('.img-upload__preview img');

const effectLevel = document.querySelector('.effect-level__value');
const effectsItems = document.querySelectorAll('.effects__radio');

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

const getFilterValue = (effect, level) => {
  const filter = filterSettings[effect];
  if (effect === 'none') {
    return `${filter.style}`;
  }
  return `${filter.style}(${level}${filter.unit ? filter.unit : ''})`;
};

slider.noUiSlider.on('update', () => {
  const appliedEffect = document.querySelector('.effects__radio:checked').value;

  effectLevel.value = slider.noUiSlider.get(); // записываем значение ползунка в скрытое поле
  imagePreview.style.filter = getFilterValue(appliedEffect, effectLevel.value); // добавляем стили
  console.log(imagePreview.style.filter); // eslint-disable-line
});

const updateSliderOptions = (evt) => {
  const filter = filterSettings[evt.target.value];

  if (filter.hidden) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }

  slider.noUiSlider.updateOptions({
    range: {
      min: filter.range.min,
      max: filter.range.max,
    },
    start: filter.start,
    step: filter.step,
  });
};

const initEffectsSlider = () => {

  effectsItems.forEach((effectItem) => {
    effectItem.addEventListener('change', updateSliderOptions);
  });

};

export { initEffectsSlider };

