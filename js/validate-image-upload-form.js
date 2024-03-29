const imageUploadForm = document.querySelector('#upload-select-image');
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const ALLOWED_HASHTAGS_NUMBER = 5;
const ALLOWED_DESCRIPTION_LENGTH = 140;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Допустимое кол-во #
const isAllowedNumber = () => {
  const hashtags = hashtagsField.value.trim().split(' ');
  return hashtags.length <= ALLOWED_HASHTAGS_NUMBER;
};

pristine.addValidator(hashtagsField, isAllowedNumber, 'Превышено допустимое количество хэштегов', 1);

// Валидность #
let invalidHashtags = [];

const isValid = () => {
  const hashtagsFieldValue = hashtagsField.value.trim();
  if (!hashtagsFieldValue) {
    return true;
  }
  const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = hashtagsFieldValue.split(' ');

  invalidHashtags = [];

  hashtags.forEach((hashtag) => {
    if (!validHashtag.test(hashtag)) {
      invalidHashtags.push(hashtag);
    }
  });

  return invalidHashtags.length === 0;
};

const getHashtagsErrorMessage = () => {
  if (invalidHashtags.length === 1) {
    return `Введен невалидный хэштег: ${invalidHashtags[0]}`;
  }
  return `Введены невалидные хэштеги: ${invalidHashtags.join(', ')}`;
};

pristine.addValidator(hashtagsField, isValid, getHashtagsErrorMessage, 2);

let checkedHashtags = [];

// Повторение #
const isRepeated = () => {
  const hashtags = hashtagsField.value.trim().split(' ');
  checkedHashtags = [];

  hashtags.forEach((hashtag) => {
    if (!checkedHashtags.includes(hashtag)) {
      checkedHashtags.push(hashtag);
    }
  });
  return hashtags.length === checkedHashtags.length;
};

pristine.addValidator(hashtagsField, isRepeated, 'Xэштеги повторяются', 3);

// Длина комментария
const isAllowedLength = () => descriptionField.value.length <= ALLOWED_DESCRIPTION_LENGTH;

pristine.addValidator(descriptionField, isAllowedLength, `Длина комментария не может быть больше ${ALLOWED_DESCRIPTION_LENGTH} символов`);

const validateByPristine = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validateByPristine, resetValidation };
