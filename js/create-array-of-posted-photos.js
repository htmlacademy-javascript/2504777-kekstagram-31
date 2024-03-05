import { getRandomInteger, createUniqueNumberGenerator, getRandomArrayElement, createArray } from './util.js';
import { getPhotoPostingData } from './data.js';

const { MESSAGES, NAMES, DESCRIPTIONS } = getPhotoPostingData();

const PHOTO_POSTS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS_COUNT = 30;

const generateCommentId = createUniqueNumberGenerator();

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
const createArrayOfPostedPhotos = () => createArray(PHOTO_POSTS_COUNT, generatePhotoPost);

export {createArrayOfPostedPhotos};
