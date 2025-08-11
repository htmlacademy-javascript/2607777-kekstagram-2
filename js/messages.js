import { isEscapeKey } from './util.js';

const TIMEOUT = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const getErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

export const showSuccess = () => {
  const successFragment = document.createDocumentFragment();
  const successElement = successTemplate.cloneNode(true);
  successFragment.append(successElement);
  document.body.append(successFragment);
  const closeButton = successElement.querySelector('.success__button');
  const onSuccessEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      successElement.remove();
    }
  };
  closeButton.addEventListener('click', () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  });

  document.addEventListener('keydown', onSuccessEscKeydown, { once: true });

  successElement.addEventListener('click', (evt) => {
    if(evt.target.className === 'success' && evt.currentTarget.className === 'success') {
      successElement.remove();
    }
  });

};

export const showErrorSending = () => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = sendErrorTemplate.cloneNode(true);

  errorFragment.append(errorElement);
  document.body.append(errorFragment);
  const closeButton = errorElement.querySelector('.error__button');
  const handleKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      errorElement.remove();
    }
  };
  closeButton.addEventListener('click', () => {
    errorElement.remove();
    document.removeEventListener('keydown', handleKeyDown);
  });

  document.addEventListener('keydown', handleKeyDown, { once: true });

  errorElement.addEventListener('click', (evt) => {
    if (evt.target.className === 'error' && evt.currentTarget.className === 'error') {
      errorElement.remove();
    }
  });

};

export const showErrorGetting = () => {
  const errorNotify = getErrorTemplate.cloneNode(true);
  const errorTitle = errorNotify.querySelector('.data-error__title');

  errorTitle.style.zIndex = '100';
  errorTitle.style.position = 'absolute';
  errorTitle.style.left = '0';
  errorTitle.style.top = '0';
  errorTitle.style.right = '0';
  errorTitle.style.padding = '10px 3px';
  errorTitle.style.fontSize = '20px';
  errorTitle.style.textAlign = 'center';
  errorTitle.style.backgroundColor = 'red';

  document.body.append(errorNotify);

  setTimeout(() =>{
    errorNotify.remove();
  }, TIMEOUT);
};

