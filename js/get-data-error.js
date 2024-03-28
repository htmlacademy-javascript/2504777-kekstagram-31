const templateDataErrorContent = document.querySelector('#data-error').content;
const templateDataError = templateDataErrorContent.querySelector('.data-error');
const MESSAGE_SHOW_TIME = 5000;

const showDataErrorMessage = () => {
  const dataErrorMessage = templateDataError.cloneNode(true);
  document.body.append(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, MESSAGE_SHOW_TIME);
};

export { showDataErrorMessage };
