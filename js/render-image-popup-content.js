import { getPostedPhotos } from './posted-photo-gallery.js';

const postedPhotos = getPostedPhotos();

const commentsContainer = document.querySelector('.social__comments');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentsTotalCount = document.querySelector('.social__comment-total-count');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

const getPhotoById = (id) => postedPhotos.find((photo) => photo.id === id);

const renderComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  const commentInfo = newComment.querySelector('.social__picture');

  commentInfo.src = avatar;
  commentInfo.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const getComments = (comments, from, to) => {
  const fragment = document.createDocumentFragment();
  let count = from;

  for (count; count < to && count < comments.length; count++) {
    const comment = renderComment(comments[count]);
    fragment.append(comment);
  }
  const result = [fragment, count];

  return result;
};

const renderComments = (openPhotoId, isCommentsLoaderClick) => {
  let commentsCount = 0;
  const COUNT_STEP = 5;

  if (isCommentsLoaderClick) {
    commentsCount = Number(commentsShownCount.textContent);
  }

  const openPhoto = getPhotoById(openPhotoId);
  const openPhotoComments = openPhoto.comments;

  const [fragment, count] = getComments(openPhotoComments, commentsCount, commentsCount + COUNT_STEP);

  commentsContainer.append(fragment);
  commentsCount = count;
  commentsShownCount.textContent = commentsCount;

  if (commentsCount === openPhotoComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderPopupContent = ({id, url, likes, description, comments}) => {
  document.querySelector('.big-picture__img img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.social__caption').textContent = description;
  commentsTotalCount.textContent = comments.length;
  commentsContainer.innerHTML = '';

  renderComments(id);
};

export { getPhotoById, renderPopupContent, renderComments};
