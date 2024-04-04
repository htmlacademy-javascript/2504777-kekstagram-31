const imageUploadForm = document.querySelector('#upload-select-image');
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');

const AllowedValue = {
  HASHTAGS:
  {
    NUMBER: 5,
    MAX_SYMBOLS: 20,
    MIN_SYMBOLS: 2,
  },
  DESCRIPTION_LENGTH: 140,
};

const { HASHTAGS, DESCRIPTION_LENGTH } = AllowedValue;

const VALID_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;

let errorMessage = '';

const getHashtagsFieldValue = () => hashtagsField.value.replace(/\s+/g, ' ').trim(' ');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const ValidationRules = [
  {
    check: (hashtags) => hashtags.some((hashtag) => !hashtag.startsWith('#')),
    error: 'Хэштег должен начинаться с символа # (решётка)',
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => hashtag.length < HASHTAGS.MIN_SYMBOLS),
    error: 'Хештег не может состоять только из одной решётки',
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => hashtag.slice(1).includes('#')),
    error: 'Хештеги разделяются пробелами',
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => hashtag.length > HASHTAGS.MAX_SYMBOLS),
    error: 'Mаксимальная длина одного хэштега 20 символов, включая решётку',
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => !VALID_HASHTAGS.test(hashtag)),
    error: 'Хэштег содержит недопустимые символы',
  },
  {
    check: (hashtags) => hashtags.some((hashtag, num, array) => array.includes(hashtag, num + 1)),
    error: 'Oдин и тот же хэштег не может быть использован дважды',
  },
  {
    check: (hashtags) => hashtags.length > HASHTAGS.NUMBER,
    error: `Нельзя указать больше ${HASHTAGS.NUMBER} хэштегов`,
  },
];

const isValidationRulesFollowed = () => {
  errorMessage = '';
  const hashtags = getHashtagsFieldValue().toLowerCase().split(' ');

  return ValidationRules.every((rule) => {

    const isRuleBroken = rule.check(hashtags);
    if (isRuleBroken) {
      errorMessage = rule.error;
    }
    return !isRuleBroken;
  });
};

// Валидность #
const isValid = () => {
  if (!getHashtagsFieldValue()) {
    return true;
  }
  return isValidationRulesFollowed();
};

const getErrorMessage = () => errorMessage;

pristine.addValidator(hashtagsField, isValid, getErrorMessage, 2);

const isAllowedLength = () => descriptionField.value.length <= DESCRIPTION_LENGTH;

pristine.addValidator(descriptionField, isAllowedLength, `Длина комментария не может быть больше ${DESCRIPTION_LENGTH} символов`);

const validateByPristine = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validateByPristine, resetValidation };
