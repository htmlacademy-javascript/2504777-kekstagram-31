import { createArrayOfPostedPhotos } from './create-array-of-posted-photos.js';

const picturesContainer = document.querySelector('.pictures');
const templatePictureContent = document.querySelector('#picture').content;
const templatePicture = templatePictureContent.querySelector('.picture');

const postedPhotos = createArrayOfPostedPhotos();
const fragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const newThumbnail = templatePicture.cloneNode(true);
  const newThumbnailImage = newThumbnail.querySelector('.picture__img');

  newThumbnailImage.src = photo.url;
  newThumbnailImage.alt = photo.description;

  newThumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  newThumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return newThumbnail;
};

const renderThumbnails = () => {
  postedPhotos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };


/* Если потребуется универсальная функция для отрисовки элементов

const renderElements = (sourceData, constructorFunction, placeToAdd) => {
  const fragment = document.createDocumentFragment();

  sourceData.forEach((elem) => {
    const element = constructorFunction(elem);
    fragment.append(element);
  });

  placeToAdd.append(fragment);
};
*/
