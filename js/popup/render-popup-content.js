import { renderComments } from './render-comments.js';


const renderPopupContent = ({id, url, likes, description, comments}) => {
  document.querySelector('.big-picture__img img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.social__comment-total-count').textContent = comments.length;
  document.querySelector('.social__comments').innerHTML = '';

  renderComments(id);
};

export { renderPopupContent };
