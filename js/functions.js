// Задача 1
const isStringLengthCorrect = (string, maxLength) => string.length <= maxLength; //eslint-disable-line

// Задача 2, вариант 1
const isPolindrome = (string) => { //eslint-disable-line
  string = string.replaceAll(' ', '').toLowerCase();

  let reverseString = '';

  for (let i = 1; i <= string.length; i++) {
    reverseString += string.at(-i);
  }
  return string === reverseString;
};

// Задача 2, вариант 2
const isPolindrome2 = (string) => { //eslint-disable-line
  string = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < Math.floor(string.length / 2); i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

// Задача 3
const extractNumber = (text) => { //eslint-disable-line
  text = String(text);

  let number = '';

  for (let i = 0; i < text.length; i++) {
    const currentSymbol = text[i];
    if (Number.isNaN(parseInt(currentSymbol, 10))) {
      continue;
    }
    number += currentSymbol;
  }
  return parseInt(number, 10);
};
