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

// * Molule5-task2

// 2.1
const isKeepingUpWorkingHours = (startWorkingDay = '', endWorkingDay = '', startMeeting = '', durationMeeting = 0) => {
  const MINUTES_IN_HOUR = 60;

  const data = [startWorkingDay, endWorkingDay, startMeeting].map((element) => element.split(':'));
  const dataInMinutes = data.map((element) => element[0] * MINUTES_IN_HOUR + Number(element[1]));

  ([startWorkingDay, endWorkingDay, startMeeting] = dataInMinutes);

  const meetingEndTime = startMeeting + durationMeeting;

  return startMeeting >= startWorkingDay && meetingEndTime <= endWorkingDay;
};

console.log(isKeepingUpWorkingHours('08:00', '17:30', '14:00', 90)); //eslint-disable-line

// 2.2
const MINUTES_IN_HOUR = 60;

const convertTimeToMinutes = (time) => {
  const data = time.split(':');
  return data[0] * MINUTES_IN_HOUR + Number(data[1]);
}

const isKeepingUpWorkingHours2 = (startWorkingDay = '', endWorkingDay = '', startMeeting = '', durationMeeting = 0) => {
  startWorkingDay = convertTimeToMinutes(startWorkingDay);
  endWorkingDay = convertTimeToMinutes(endWorkingDay);
  startMeeting = convertTimeToMinutes(startMeeting);

  const meetingEndTime = startMeeting + durationMeeting;

  return startMeeting >= startWorkingDay && meetingEndTime <= endWorkingDay;
};

console.log(isKeepingUpWorkingHours2('08:00', '14:30', '14:00', 90)); //eslint-disable-line

