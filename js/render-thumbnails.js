const picturesContainer = document.querySelector('.pictures');
const templatePictureContent = document.querySelector('#picture').content;
const templatePicture = templatePictureContent.querySelector('.picture');

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
