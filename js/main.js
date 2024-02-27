const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артем',
  'Иван',
  'Ольга',
  'Инна',
  'Андрей',
  'Софья',
  'Антон',
  'Анна',
  'Максим',
  'Михаил',
  'Оксана',
];

const DESCRIPTIONS = [
  'Какава красота',
  'Просто красивое фото',
  'То, что я люблю',
];

const PHOTO_POSTS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS_COUNT = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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

const generateCommentId = createUniqueNumberGenerator();

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateMessage = (array) => {
  const firstSentence = getRandomArrayElement(array);

  if (Math.random() < 0.5) {
    return firstSentence;
  }

  let secondSentence = '';

  do {
    secondSentence = getRandomArrayElement(array);
  } while (firstSentence === secondSentence);

  return `${firstSentence} ${secondSentence}`;
};

const createArray = (arrayLength, constructorFunction) => Array.from({length: arrayLength}, constructorFunction);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoPostGenerator = () => {
  let indexNumber = 1;

  return () => {
    const photoPost = {
      id: indexNumber,
      url: `photos/${indexNumber}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: createArray(getRandomInteger(0, MAX_COMMENTS_COUNT), createComment),
    };

    indexNumber++;
    return photoPost;
  };
};

const generatePhotoPost = createPhotoPostGenerator();
const photosPostedByUser = createArray(PHOTO_POSTS_COUNT, generatePhotoPost);

console.log(photosPostedByUser); //eslint-disable-line


