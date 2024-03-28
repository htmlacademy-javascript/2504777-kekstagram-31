// import { getPostedPhotos } from './posted-photo-gallery.js';

const picturesContainer = document.querySelector('.pictures');
const templatePictureContent = document.querySelector('#picture').content;
const templatePicture = templatePictureContent.querySelector('.picture');

// const postedPhotos = getPostedPhotos();

const createThumbnail = ({id, url, description, likes, comments}) => {
  const newThumbnail = templatePicture.cloneNode(true);
  const newThumbnailImage = newThumbnail.querySelector('.picture__img');

  newThumbnail.dataset.photoId = id;

  newThumbnailImage.src = url;
  newThumbnailImage.alt = description;

  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  newThumbnail.querySelector('.picture__likes').textContent = likes;

  return newThumbnail;
};

const renderThumbnails = (postedPhotos) => {
  const fragment = document.createDocumentFragment();

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
