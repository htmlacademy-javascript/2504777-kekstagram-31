// Проверка нажатой клавиши на Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Устранение дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, debounce };
