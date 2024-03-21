// Получение случайного числа из переданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Генератор уникального числа из переданного диапазона
const createUniqueNumberGenerator = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const usedNumbers = [];

  return () => {
    let currentNumber = 0;

    if (usedNumbers.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`); //eslint-disable-line
      return null;
    }

    do {
      currentNumber = getRandomInteger(min, max);
    } while (usedNumbers.includes(currentNumber));

    usedNumbers.push(currentNumber);
    return currentNumber;
  };
};

// Получение случайного элемента массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Создание массива заданной длины с использованием функции-конструктора
const createArray = (arrayLength, constructorFunction) => Array.from({length: arrayLength}, constructorFunction);

// Проверка нажатой клавиши на Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// function getPopupHandlers(targetPopup) {
//   let listener;
//   let close;

//   const popupHandlers = {
//     openHandler: function() {
//       targetPopup.classList.remove('hidden');
//       document.body.classList.add('modal-open');
//       document.addEventListener('keydown', listener);
//     },
//     closeHandler: function() {
//       targetPopup.classList.add('hidden');
//       document.body.classList.remove('modal-open');
//       document.removeEventListener('keydown', listener);
//     },
//     onDocumentEscKeydown: function(evt) {
//       if (isEscapeKey(evt)) {
//         close();
//       }
//     }
//   };

//   listener = popupHandlers.onDocumentEscKeydown;
//   close = popupHandlers.closeHandler;

//   return popupHandlers;
// }

export { getRandomInteger, createUniqueNumberGenerator, getRandomArrayElement, createArray, isEscapeKey };
