const templateDataErrorContent = document.querySelector('#data-error').content;
const templateDataError = templateDataErrorContent.querySelector('.data-error');
const MESSAGE_SHOW_TIME = 5000;

const showToastError = (errorMessage) => {
  const errorElement = templateDataError.cloneNode(true);
  if (errorMessage) {
    errorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, MESSAGE_SHOW_TIME);
};

export { showToastError };
